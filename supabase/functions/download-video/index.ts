/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Dummy API keys - User will replace these via Secrets
const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY') || 'YOUR_RAPIDAPI_KEY_HERE';
const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY') || 'YOUR_YOUTUBE_API_KEY_HERE';

interface VideoInfo {
  platform: string;
  title?: string;
  downloadUrl?: string;
  thumbnail?: string;
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'Video URL required' }), {
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
    } else if (url.includes('facebook.com')) {
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

    console.log(`Video download requested for ${platform}: ${url}`);

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

    return new Response(JSON.stringify(videoInfo), {
      status: videoInfo.error ? 400 : 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error:', error);
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
    // Using RapidAPI's YouTube Video Downloader
    const response = await fetch('https://youtube-video-download-info.p.rapidapi.com/dl?url=' + encodeURIComponent(url), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'youtube',
      title: data.title,
      downloadUrl: data.link || data.formats?.[0]?.url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('YouTube download error:', error);
    return {
      platform: 'youtube',
      error: 'Failed to fetch YouTube video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadInstagram(url: string): Promise<VideoInfo> {
  try {
    // Using RapidAPI's Instagram Downloader
    const response = await fetch('https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'instagram',
      title: data.title || 'Instagram Video',
      downloadUrl: data.media?.[0]?.url || data.video_url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('Instagram download error:', error);
    return {
      platform: 'instagram',
      error: 'Failed to fetch Instagram video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadFacebook(url: string): Promise<VideoInfo> {
  try {
    // Using RapidAPI's Facebook Video Downloader
    const response = await fetch('https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'facebook',
      title: data.title || 'Facebook Video',
      downloadUrl: data.links?.[0]?.url || data.download_url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('Facebook download error:', error);
    return {
      platform: 'facebook',
      error: 'Failed to fetch Facebook video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadTwitter(url: string): Promise<VideoInfo> {
  try {
    // Using RapidAPI's Twitter Video Downloader
    const response = await fetch('https://twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'twitter',
      title: data.title || 'Twitter Video',
      downloadUrl: data.media?.[0]?.url || data.video_url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('Twitter download error:', error);
    return {
      platform: 'twitter',
      error: 'Failed to fetch Twitter video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadTikTok(url: string): Promise<VideoInfo> {
  try {
    const response = await fetch('https://tiktok-video-no-watermark2.p.rapidapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'tiktok',
      title: data.title || 'TikTok Video',
      downloadUrl: data.data?.play || data.video_url,
      thumbnail: data.data?.cover
    };
  } catch (error) {
    console.error('TikTok download error:', error);
    return {
      platform: 'tiktok',
      error: 'Failed to fetch TikTok video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadPinterest(url: string): Promise<VideoInfo> {
  try {
    const response = await fetch('https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=' + encodeURIComponent(url), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'pinterest-video-and-image-downloader.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'pinterest',
      title: data.title || 'Pinterest Video',
      downloadUrl: data.video_url || data.data?.video_url,
      thumbnail: data.thumbnail || data.data?.thumbnail
    };
  } catch (error) {
    console.error('Pinterest download error:', error);
    return {
      platform: 'pinterest',
      error: 'Failed to fetch Pinterest video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadVimeo(url: string): Promise<VideoInfo> {
  try {
    const response = await fetch('https://vimeo-downloader2.p.rapidapi.com/vimeo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'vimeo-downloader2.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'vimeo',
      title: data.title || 'Vimeo Video',
      downloadUrl: data.video?.[0]?.url || data.download_url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('Vimeo download error:', error);
    return {
      platform: 'vimeo',
      error: 'Failed to fetch Vimeo video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}

async function downloadDailymotion(url: string): Promise<VideoInfo> {
  try {
    const response = await fetch('https://dailymotion-video-downloader1.p.rapidapi.com/download?url=' + encodeURIComponent(url), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'dailymotion-video-downloader1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      platform: 'dailymotion',
      title: data.title || 'Dailymotion Video',
      downloadUrl: data.download_url || data.video_url,
      thumbnail: data.thumbnail
    };
  } catch (error) {
    console.error('Dailymotion download error:', error);
    return {
      platform: 'dailymotion',
      error: 'Failed to fetch Dailymotion video. Please ensure RAPIDAPI_KEY is configured correctly in Secrets.'
    };
  }
}
