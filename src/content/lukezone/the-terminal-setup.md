---
title: "How I Run 14 AI Agents From My Phone"
date: 2026-08-11
description: "Ghostty, herdr, Tailscale, and the multiplexed agent workflow that lets me orchestrate research, teaching, and coding from anywhere."
tags: ["terminal", "ghostty", "herdr", "tailscale", "claude-code", "workflow"]
draft: false
---

## Fourteen agents from my phone

I can run fourteen AI agents from my phone. I do it most mornings — lying in bed, half awake, checking which agents need attention before I've made coffee. They're patiently waiting for me. Some of them have reports they've written. Others are hanging on a simple prompt: "permission to find `<insert grep I can barely comprehend>` in pages 257-282 in some textbook" uh, yeah sure go for it. [press 1].

Okay fine, to be honest the phone _works_ but it's nowhere near the _best_ interface. but it works. herdr has a touch interface that lets you swipe between workspaces and tap to unblock agents. But it's a small screen.

Instead I might open my small travel laptop — the one that lives at home — and SSH into my office Mac at the university `<ssh work>`. Tailscale makes it reachable from anywhere. I open Ghostty, and there they are: nine named workspaces, each with one to three Claude Code agents in various states. Some are idle, waiting where I left them last night. Some are blocked, needing a decision from me.

I scan the statuses. I launch a couple of new agents on tasks. "Can you please remind me where the resolution parameter sweep file is?" "Actually for this lecture I think we should rethink the order of topics on slide 20 to 25. The historical background feels a little out of place and might be better to go after a brief intro about mutation rates". With the agents churning, I bike to the office. By the time I sit down at my desk, I have a new swarm of questions to answer, permissions to grant, and reports to read.

My previous setup was using the Claude Code plugin in VS Code. Sure I was running multiple conversations. But they died when I closed the lid. I tried using Claude's built-in remote feature, but I'd forget to enable it before starting a conversation. And what if I want to start a new remote conversation? I used an elaborate system where Obsidian was the sync layer — save checkpoints, push to GitHub, pull on the other device. It was clever and it worked sometimes. But I'd inevitably forget to push, or I'd want conversation context that wasn't captured in the files.

What I have now is a fairly reliable framework that actually works quite well. I mean who knows what I'll be doing in 6 months but hey, in August 2026 this is what I'm running.

Oh yeah obligatory shout out to my brother Mark who put me onto most of these tools, this is basically his workflow I'm stealing.

## The stack

**Ghostty** ([ghostty.org](https://ghostty.org/)) is basically just a better terminal. It auto-copies text when you highlight it. It has sound notifications. It has the kind of small quality-of-life touches — GUI clicks and tabs, nice fonts and settings.

**herdr** ([herdr.dev](https://herdr.dev)) is the actual magic. It's basically tmux. It keeps terminals open when you disconnect. but it's got some smart features built specifically for AI coding agents.  It's got a little sidebar that tracks agent status so you can see which agents need you. It's got a bare-bones mobile-friendly touch screen interface. It supports all the AI coding agents out of the box, I know some people will weave in multiple AI tools, though I mostly use Claude Code at this stage.

**Tailscale** ([tailscale.com](https://tailscale.com)) is a mesh VPN. It makes my office Mac reachable from my home network, my phone, my iPad, anywhere with internet. I SSH in through Tailscale, attach to herdr, and I'm looking at the exact same terminal screen I left when I walked out of the office.

**claude-swap** ([github.com/realiti4/claude-swap](https://github.com/realiti4/claude-swap)) is a multi-account manager for Claude Code. It's a little clunky to set up, but most people won't need it, more of a power user thing. That said, if you're spawning a swarm of agents, you will hit rate limits. cswap lets you rotate between multiple Claude accounts based on usage. When one account approaches its five-hour cap, it switches to the one with the most remaining quota. The transitions are fairly seamless once you set it up.

## How to actually use this

- **Round-robin your agents.** Don't wait for one to finish — unblock it and switch to another project. The flow state comes from cycling, not staring.
- **Write handoff docs.** Every conversation that matters should produce a checkpoint before it ends: what was done, what's open, what to do next. The files are the memory, not the conversation. Long conversations degrade — short focused sessions with good handoffs outperform marathon sessions every time.
- **Kill idle agents.** It is dangerously easy to accumulate eighteen open conversations and lose track of half of them. Close things when they're done.
- **Use voice input on mobile.** Super Whisper lets you give an agent a paragraph of direction from your phone without typing on a tiny keyboard. Combined with the [capture pipeline from post #1](/lukezone/the-academic-ai-workflow), voice notes become agent tasks.

## The bottom line

### What's bad

**No images.** The terminal can't handle pasting images, and Claude Code in the terminal can't read PDFs the way the VS Code extension can. For tasks that involve screenshots, diagrams, or document review, I still drop into VS Code with the Claude Code plugin. It doesn't feel like a burden — it's a targeted tool for specific jobs — but it means this isn't a *complete* replacement for the IDE workflow.

**Conversation sprawl.** It is dangerously easy to spin up new agents. "I'll just start a quick conversation for this one thing" — and suddenly you have eighteen agents and you've lost track of what half of them are doing. The system requires discipline. Close conversations when they're done. Write the checkpoint. Don't let idle agents accumulate like browser tabs.

**Terminal text editing.** When you're composing a long prompt in the terminal, you're not in a text editor. You're holding Option-Left to jump between words and hoping you don't accidentally submit halfway through a sentence. It's manageable.

**Remote edge cases.** If the office loses power, you lose connection. The wifi drops, you lose connection. That's obvious. Less obvious: I once had a rogue GUI prompt appear on the lab machine — something that required clicking a dialog box — and it broke the Tailscale connection. I couldn't SSH in to dismiss it. (This last one has happened only once). But this paints a picture that these remote connections are fragile.

### What's good

**Less context is a feature.** I said long conversations degrade, and that's true. But the checkpoint/handoff discipline that this workflow forces — writing down what happened, closing the session, starting fresh — actually produces better results. Constraints improve output.

**The mobile experience is real.** Not perfect, but real. Being able to unblock agents from your phone while waiting in line at the grocery checkout is pretty wild -- what a time to be alive.

**Everything composes.** Voice notes from post #1 feed into Obsidian. Obsidian notes become agent tasks. Agent output becomes more Obsidian notes, or git commits, or markdown documents, or lecture materials. The tools don't really know about each other, but the filesystem connects them.

## Take home

Okay so the workflow works pretty well overall, but it was still a bit of a struggle to setup a bunch of separate tools and wire them together to get a workflow that works. A terminal. A VPN. A session manager. Markdown files on a filesystem.

Persistent agents that survive disconnects and are reachable from anywhere feels like the direction things are going in. This is a niche that will be filled in soon.

---
