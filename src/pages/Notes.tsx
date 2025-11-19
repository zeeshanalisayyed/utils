import { useState } from "react";
import { ArrowLeft, Plus, Trash2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const addNote = () => {
    if (!title.trim() && !content.trim()) {
      toast({
        title: "Empty note",
        description: "Please add a title or content",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      createdAt: new Date(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setTitle("");
    setContent("");
    toast({
      title: "Note added",
      description: "Your note has been saved",
    });
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Notes</h1>
              <p className="text-xs text-muted-foreground">Quick notes and reminders</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AdBanner />
        {/* Add Note Card */}
        <Card className="p-6 border-border bg-card mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">New Note</h2>
          <div className="space-y-4">
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <Button onClick={addNote} className="w-full bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </Card>

        {/* Notes List */}
        {notes.length === 0 ? (
          <Card className="p-12 border-border bg-card/50">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No notes yet</h3>
              <p className="text-muted-foreground">Create your first note to get started</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Card
                key={note.id}
                className="p-4 border-border bg-card hover:shadow-[0_4px_12px_hsl(var(--primary)/0.1)] transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      {note.createdAt.toLocaleDateString()} at{" "}
                      {note.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNote(note.id)}
                    className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;
