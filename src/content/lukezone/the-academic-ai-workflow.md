---
title: "The Academic's AI Workflow: From Voice Note to Git Push"
date: 2026-08-04
description: "How I chain Super Whisper, Shortcuts, Obsidian, and Claude Code into a system that keeps me connected to reality while working with AI agents."
tags: ["workflow", "AI", "obsidian", "claude-code", "super-whisper"]
draft: false
---

## The problem

My brain doesn't generate ideas at convenient times. Sometimes yes, but most of the time it'll be while I'm doing something else.

I've gone through different note capture systems. For a while I had a little notebook in my back pocket at all times (shout out to Field Notes). I'm not a hater of physical notes.

But it's hard to keep up -- notes go stale, I forget to check. I'll text myself or email myself about something, and it works in the moment, but there's no way to organize texts and emails into anything structured.

As I transition into being a professor -- a position that actually comes with certain responsibilities (yuck!) -- I realized that calendars are a useful tool. (I know.) As I started accumulating meetings I also started wanting a better system for capturing notes.

First it was getting into [Obsidian](https://obsidian.md). Basically just a collection of files and folders -- there are other note-taking apps out there, but I like this one personally.

Next was [Super Whisper](https://superwhisper.com). A speech-to-text model that runs locally on your phone or computer. (It'll try to sell you the paid model, but click through the settings and find the free one.) I use it to dictate into AI tools like Claude Code and ChatGPT -- talking is faster than typing, and these models are surprisingly good at catching unstructured rambling text.

Teenage Engineering's TP-7. Ugh. Expensive but so nice. Anyway. The TP-7 has a single button note capture feature reminiscent of the old school tape recorder notes. I wanted that feature but connected to my Obsidian system.

So I built it.

## The tool chain

1. [**Super Whisper**](https://superwhisper.com) -- on-device voice-to-text. Hotkey on my phone, finish talking, transcript on clipboard. No cloud -- I don't want my voice on someone else's servers.
2. **iOS Shortcuts** -- routes the transcript into Obsidian. Creates a timestamped markdown file in `Capture/Audio_Inbox/` with source metadata. No intelligence, just reliable routing.
3. [**Claude Code**](https://docs.anthropic.com/en/docs/claude-code) + a custom `processing-audio-notes` skill -- scans for raw notes, identifies gaps, asks me clarification questions (or flags them if I'm in a rush), then extracts tasks, ideas, people, and dates into a consistent format.
4. [**Obsidian**](https://obsidian.md) -- where everything lives. Processed notes link to projects and people through wikilinks. Tasks get promoted, ideas get developed, research directions become GitHub issues.

## What processing looks like

A raw voice note comes in like this:

```
Alright so a few things I need to take care of. First the
conference abstract deadline is coming up I think its the 18th
and I need to get a draft to my collaborators before I submit
it so probably want to budget a half day for writing. Also I
had an idea about the allele frequency visualization we could
probably use a ridge plot instead of the heatmap also I
need to follow up with the new student about getting him
set up on the compute cluster
```

No punctuation. No paragraph breaks. Four different topics in one breath.

The processing skill reads it, notices what's missing, and asks:

```
Found incomplete information:
1. "conference abstract deadline" -- Which conference?
2. "get a draft to my collaborators" -- Which collaborators?
3. "the new student" -- Student's name?
```

If I have time, I answer. If not, I skip -- it processes what it can and flags what it can't.

After processing:

```
**Tasks:**
- [Large] Write and submit conference abstract -- deadline ~May 18
- [Quick] Follow up with new student about compute allocation

**Ideas:**
- Ridge plot instead of heatmap for allele frequency poster

**Needs Clarification:**
- Which conference? (assumed ASHG based on timing)
- Student's name? 
```

(The original raw capture stays in the note.)

---

