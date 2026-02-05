"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Sparkles,
  GitCommit,
  ArrowRight,
  Github,
  Key,
  Zap,
  Cpu,
  Bot,
  Search,
  Share2,
  ShieldCheck,
  Languages,
  History,
  FileJson,
  Database,
  Lock,
  Rocket,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  return (
    <div className="bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 glass border border-white/5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-400 mb-8 animate-float">
              <Sparkles className="h-4 w-4" />
              <span>v0.2.0 STABLE</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white">
              Changelogs for <span className="text-gradient">Developers.</span><br />
              Context for <span className="text-green-500">AI Agents.</span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop wasting hours on manual release notes. GitLog AI automates the translation of technical commits into structured documentation for users and LLMs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-10 text-lg bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/20 group" asChild>
                <Link href="/login">
                  <Github className="mr-2 h-5 w-5" />
                  Sign In with GitHub
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg glass border-white/10 hover:bg-white/5 text-white" asChild>
                <Link href="/resources/tutorial">How it works</Link>
              </Button>
            </div>
          </motion.div>

          {/* Interactive Demo Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-24 max-w-5xl mx-auto glass-dark border-white/5 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
            <div className="grid md:grid-cols-2">
              <div className="p-10 border-r border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-6 text-xs font-bold uppercase tracking-widest">
                  <GitCommit className="h-4 w-4 text-green-500" />
                  Commit Input
                </div>
                <div className="space-y-3 font-mono text-sm leading-relaxed">
                  <p className="text-green-400/60">fix: repair memory leak in worker #43</p>
                  <p className="text-green-400">feat: add dark mode support</p>
                  <p className="text-green-400/40">docs: update API documentation</p>
                  <p className="text-green-400">fix(auth): handle expired tokens</p>
                  <p className="text-green-400/80">feat: implement webhook notifications</p>
                </div>
              </div>
              <div className="p-10 bg-black/40">
                <div className="flex items-center gap-2 text-gray-500 mb-6 text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  AI Output
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-green-400 text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-wide">
                      <Rocket className="h-4 w-4" /> Features
                    </h3>
                    <ul className="text-sm text-gray-300 space-y-1 ml-4 list-disc">
                      <li>Modern dark mode interface</li>
                      <li>Universal webhook endpoints</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-wide">
                      <Wrench className="h-4 w-4" /> Stability
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc">
                      <li>Fixed critical leak in worker thread</li>
                      <li>Improved OAuth resilience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MCP Section */}
      <section className="py-24 relative overflow-hidden bg-black/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Cpu className="h-3 w-3" /> Machine Readable
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight uppercase tracking-tighter">
                Context for your <br /><span className="text-blue-500">AI Agents.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                GitLog AI is a fully-fledged Model Context Protocol (MCP) server.
                Connect your local agents (Claude Desktop, IDEs) to get real-time awareness of your codebase evolution.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                  <Bot className="h-5 w-5 text-blue-400 mb-2" />
                  <span className="text-xs font-bold text-white block">Stdio MCP</span>
                  <span className="text-[10px] text-gray-500">For Claude Desktop</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                  <Share2 className="h-5 w-5 text-green-400 mb-2" />
                  <span className="text-xs font-bold text-white block">HTTP SSE</span>
                  <span className="text-[10px] text-gray-500">For Remote Agents</span>
                </div>
              </div>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 px-6" asChild>
                <Link href="/docs/mcp-integration">Integration Guide</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark p-1 rounded-3xl border-white/10 overflow-hidden"
            >
              <div className="bg-gray-950 rounded-[1.4rem] p-6 font-mono text-[11px] text-gray-400 leading-relaxed border border-white/5 shadow-2xl">
                <p className="text-blue-500 mb-4">// agents.json</p>
                <p>&quot;mcpServers&quot;: &#123;</p>
                <p className="ml-4">&quot;gitlog&quot;: &#123;</p>
                <p className="ml-8">&quot;command&quot;: &quot;node&quot;,</p>
                <p className="ml-8">&quot;args&quot;: [&quot;gitlog-mcp.js&quot;],</p>
                <p className="ml-8">&quot;env&quot;: &#123; &quot;GITHUB_TOKEN&quot;: &quot;...&quot; &#125;</p>
                <p className="ml-4">&#125;</p>
                <p>&#125;</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">The Complete Toolkit.</h2>
            <p className="text-gray-400">Everything we built for effortless releases.</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Smart Sync", desc: "Native GitHub OAuth integration.", icon: Zap },
              { title: "Deep Inspection", desc: "LLM analysis of commit titles.", icon: Search },
              { title: "Multi-Lingual", desc: "English, Hindi, Spanish, German.", icon: Languages },
              { title: "Custom Formats", desc: "Keep a Changelog, raw Markdown.", icon: FileJson },
              { title: "Semver Bot", desc: "Automated version suggestions.", icon: Sparkles },
              { title: "Push to Repo", desc: "Direct CHANGELOG.md updates.", icon: Share2 },
              { title: "MCP Server", desc: "Technical repo awareness.", icon: Cpu },
              { title: "Rate Limited", desc: "IP and token-based protection.", icon: ShieldCheck },
              { title: "History Hub", desc: "Unified dashboard for history.", icon: History },
              { title: "BYOK Enabled", desc: "Use your own API keys for LLMs.", icon: Key },
              { title: "Cache Layer", desc: "Fast responses via Redis & LRU.", icon: Database },
              { title: "Privacy First", desc: "No source code stored.", icon: Lock },
            ].map((feature, i) => (
              <motion.div
                variants={item}
                key={i}
                className="p-6 glass-dark border-white/5 rounded-2xl flex flex-col items-start hover:border-white/10 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-sm font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-[11px] text-gray-500 leading-normal">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center glass border-white/5 p-16 rounded-[2.5rem] relative overflow-hidden">
            <h2 className="text-5xl font-black mb-8 leading-tight text-white uppercase tracking-tighter">
              Open Source <br />
              <span className="text-gradient">Community First.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
              GitLog AI is free for everyone. We rely on community support to cover our yearly infrastructure costs ($150 goal).
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-14 px-10 bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/login">Connect My GitHub</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 glass border-white/10 text-white" asChild>
                <Link href="/resources/use-cases">View Use Cases</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
