/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY') || '';

interface VideoFormat {
  quality: string;
  url: string;
  format: string;
}

interface VideoInfo {
  platform: string;
  title?: string;
  downloadUrl?: string;
  thumbnail?: string;
  duration?: string;
  formats?: VideoFormat[];
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      console.log('No URL provided');
      return new Response(JSON.stringify({ error: 'Video URL required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!RAPIDAPI_KEY) {
      console.log('RAPIDAPI_KEY not configured');
      return new Response(JSON.stringify({ 
        error: 'RAPIDAPI_KEY not configured. Please add your RapidAPI key in project secrets.',
        platform: 'unknown'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Detect platform
    let platform = 'unknown';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      platform = 'youtube';
    } else if (url.includes('instagram.com')) {
      platform = 'instagram';
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      platform = 'facebook';
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      platform = 'twitter';
    } else if (url.includes('tiktok.com')) {
      platform = 'tiktok';
    } else if (url.includes('pinterest.com') || url.includes('pin.it')) {
      platform = 'pinterest';
    } else if (url.includes('vimeo.com')) {
      platform = 'vimeo';
    } else if (url.includes('dailymotion.com') || url.includes('dai.ly')) {
      platform = 'dailymotion';
    }

    console.log(`Processing video download for ${platform}: ${url}`);

    let videoInfo: VideoInfo;

    switch (platform) {
      case 'youtube':
        videoInfo = await downloadYouTube(url);
        break;
      case 'instagram':
        videoInfo = await downloadInstagram(url);
        break;
      case 'facebook':
        videoInfo = await downloadFacebook(url);
        break;
      case 'twitter':
        videoInfo = await downloadTwitter(url);
        break;
      case 'tiktok':
        videoInfo = await downloadTikTok(url);
        break;
      case 'pinterest':
        videoInfo = await downloadPinterest(url);
        break;
      case 'vimeo':
        videoInfo = await downloadVimeo(url);
        break;
      case 'dailymotion':
        videoInfo = await downloadDailymotion(url);
        break;
      default:
        videoInfo = {
          platform: 'unknown',
          error: 'Unsupported platform. Supported: YouTube, Instagram, Facebook, Twitter, TikTok, Pinterest, Vimeo, Dailymotion'
        };
    }

    console.log(`Video info result:`, JSON.stringify(videoInfo, null, 2));

    return new Response(JSON.stringify(videoInfo), {
      status: videoInfo.error ? 400 : 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error processing request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      platform: 'unknown'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function downloadYouTube(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching YouTube video:', url);
    
    // Try ytstream API first (more reliable)
    const response = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${extractYouTubeId(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    });

    console.log('YouTube API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error:', errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('YouTube API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    
    // Extract available formats
    if (data.formats) {
      for (const format of data.formats) {
        if (format.url && format.qualityLabel) {
          formats.push({
            quality: format.qualityLabel,
            url: format.url,
            format: format.mimeType?.split(';')[0] || 'video/mp4'
          });
        }
      }
    }

    // Get best quality URL
    const bestFormat = formats.find(f => f.quality.includes('1080') || f.quality.includes('720')) || formats[0];

    return {
      platform: 'youtube',
      title: data.title || 'YouTube Video',
      downloadUrl: bestFormat?.url || data.link,
      thumbnail: data.thumbnail?.[0]?.url || data.thumbnailUrl,
      duration: data.lengthSeconds ? formatDuration(parseInt(data.lengthSeconds)) : undefined,
      formats: formats.slice(0, 5)
    };
  } catch (error) {
    console.error('YouTube download error:', error);
    return {
      platform: 'youtube',
      error: 'Failed to fetch YouTube video. Please check your RAPIDAPI_KEY is valid and has access to YouTube downloader APIs.'
    };
  }
}

function extractYouTubeId(url: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : url;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function downloadInstagram(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Instagram video:', url);
    
    const response = await fetch('https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    console.log('Instagram API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Instagram API data:', JSON.stringify(data, null, 2));
    
    return {
      platform: 'instagram',
      title: data.title || 'Instagram Video',
      downloadUrl: data.download_url || data.video_url || data.media?.[0]?.url,
      thumbnail: data.thumbnail || data.cover
    };
  } catch (error) {
    console.error('Instagram download error:', error);
    return {
      platform: 'instagram',
      error: 'Failed to fetch Instagram video. The video may be private or the API may be unavailable.'
    };
  }
}

async function downloadFacebook(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Facebook video:', url);
    
    const response = await fetch('https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
      },
      body: `url=${encodeURIComponent(url)}`
    });

    console.log('Facebook API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Facebook API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    if (data.links) {
      for (const link of data.links) {
        formats.push({
          quality: link.quality || 'Standard',
          url: link.url,
          format: 'video/mp4'
        });
      }
    }

    return {
      platform: 'facebook',
      title: data.title || 'Facebook Video',
      downloadUrl: formats[0]?.url || data.download_url,
      thumbnail: data.thumbnail,
      formats
    };
  } catch (error) {
    console.error('Facebook download error:', error);
    return {
      platform: 'facebook',
      error: 'Failed to fetch Facebook video. The video may be private or restricted.'
    };
  }
}

async function downloadTwitter(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Twitter video:', url);
    
    const response = await fetch(`https://twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com/status?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com'
      }
    });

    console.log('Twitter API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Twitter API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    if (data.media?.video?.videoVariants) {
      for (const variant of data.media.video.videoVariants) {
        if (variant.url && variant.content_type === 'video/mp4') {
          const bitrate = variant.bitrate ? `${Math.round(variant.bitrate / 1000)}kbps` : 'Unknown';
          formats.push({
            quality: bitrate,
            url: variant.url,
            format: 'video/mp4'
          });
        }
      }
    }

    return {
      platform: 'twitter',
      title: data.text?.substring(0, 100) || 'Twitter Video',
      downloadUrl: formats[0]?.url || data.media?.video?.videoVariants?.[0]?.url,
      thumbnail: data.media?.media_url_https,
      formats: formats.sort((a, b) => parseInt(b.quality) - parseInt(a.quality)).slice(0, 5)
    };
  } catch (error) {
    console.error('Twitter download error:', error);
    return {
      platform: 'twitter',
      error: 'Failed to fetch Twitter video. The tweet may be private or deleted.'
    };
  }
}

async function downloadTikTok(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching TikTok video:', url);
    
    const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      }
    });

    console.log('TikTok API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('TikTok API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    if (data.data?.play) {
      formats.push({ quality: 'With Watermark', url: data.data.play, format: 'video/mp4' });
    }
    if (data.data?.wmplay) {
      formats.push({ quality: 'No Watermark', url: data.data.wmplay, format: 'video/mp4' });
    }
    if (data.data?.hdplay) {
      formats.push({ quality: 'HD', url: data.data.hdplay, format: 'video/mp4' });
    }

    return {
      platform: 'tiktok',
      title: data.data?.title || 'TikTok Video',
      downloadUrl: data.data?.play || data.data?.wmplay,
      thumbnail: data.data?.cover || data.data?.origin_cover,
      duration: data.data?.duration ? formatDuration(data.data.duration) : undefined,
      formats
    };
  } catch (error) {
    console.error('TikTok download error:', error);
    return {
      platform: 'tiktok',
      error: 'Failed to fetch TikTok video. The video may be private or restricted.'
    };
  }
}

async function downloadPinterest(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Pinterest video:', url);
    
    const response = await fetch(`https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'pinterest-video-and-image-downloader.p.rapidapi.com'
      }
    });

    console.log('Pinterest API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Pinterest API data:', JSON.stringify(data, null, 2));
    
    return {
      platform: 'pinterest',
      title: data.title || 'Pinterest Video',
      downloadUrl: data.video_url || data.data?.video_url || data.image,
      thumbnail: data.thumbnail || data.data?.thumbnail
    };
  } catch (error) {
    console.error('Pinterest download error:', error);
    return {
      platform: 'pinterest',
      error: 'Failed to fetch Pinterest content. It may be an image, not a video.'
    };
  }
}

async function downloadVimeo(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Vimeo video:', url);
    
    // Extract Vimeo ID
    const vimeoIdMatch = url.match(/vimeo\.com\/(\d+)/);
    const vimeoId = vimeoIdMatch ? vimeoIdMatch[1] : url;

    const response = await fetch(`https://vimeo-downloader2.p.rapidapi.com/vimeo?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'vimeo-downloader2.p.rapidapi.com'
      }
    });

    console.log('Vimeo API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Vimeo API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    if (data.video) {
      for (const video of data.video) {
        formats.push({
          quality: video.quality || 'Standard',
          url: video.url,
          format: 'video/mp4'
        });
      }
    }

    return {
      platform: 'vimeo',
      title: data.title || 'Vimeo Video',
      downloadUrl: formats[0]?.url || data.download_url,
      thumbnail: data.thumbnail,
      duration: data.duration,
      formats
    };
  } catch (error) {
    console.error('Vimeo download error:', error);
    return {
      platform: 'vimeo',
      error: 'Failed to fetch Vimeo video. The video may be private or the API may be unavailable.'
    };
  }
}

async function downloadDailymotion(url: string): Promise<VideoInfo> {
  try {
    console.log('Fetching Dailymotion video:', url);
    
    const response = await fetch(`https://dailymotion-video-downloader1.p.rapidapi.com/download?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'dailymotion-video-downloader1.p.rapidapi.com'
      }
    });

    console.log('Dailymotion API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dailymotion API data:', JSON.stringify(data, null, 2));
    
    const formats: VideoFormat[] = [];
    if (data.qualities) {
      for (const [quality, info] of Object.entries(data.qualities)) {
        if ((info as any).url) {
          formats.push({
            quality: quality,
            url: (info as any).url,
            format: 'video/mp4'
          });
        }
      }
    }

    return {
      platform: 'dailymotion',
      title: data.title || 'Dailymotion Video',
      downloadUrl: formats[0]?.url || data.download_url || data.video_url,
      thumbnail: data.thumbnail,
      duration: data.duration,
      formats
    };
  } catch (error) {
    console.error('Dailymotion download error:', error);
    return {
      platform: 'dailymotion',
      error: 'Failed to fetch Dailymotion video. Please check the URL is correct.'
    };
  }
}
