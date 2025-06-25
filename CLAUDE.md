# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Qwik-based web application for managing raffles/rifas. The app integrates with Supabase for backend services and is configured for deployment on Cloudflare Pages. The primary functionality includes:

- Public raffle pages with payment integration
- Preview pages for raffle management
- Bootstrap-based responsive UI
- Supabase database integration for raffle and payment data

## Development Commands

### Core Development
- `npm start` - Start development server with SSR
- `npm run dev` - Alternative development command
- `npm run dev.debug` - Start development server with debugging

### Building
- `npm run build` - Full production build (client + server)
- `npm run build.client` - Build client-side only
- `npm run build.server` - Build server-side for static generation
- `npm run build.types` - TypeScript type checking without emit

### Code Quality
- `npm run lint` - Run ESLint on TypeScript files
- `npm run fmt` - Format code with Prettier
- `npm run fmt.check` - Check code formatting

### Preview & Deployment
- `npm run preview` - Build and preview production version
- `npm run serve` - Serve built app with Wrangler (Cloudflare Pages)
- `npm run deploy` - Deploy to Cloudflare Pages

## Architecture

### Directory Structure
- `src/routes/` - File-based routing with QwikCity
- `src/components/` - Reusable UI components
- `src/libs/` - Utility libraries (Supabase client)
- `src/constants/` - Application constants and data
- `adapters/` - Build adapters for different deployment targets

### Key Architectural Patterns

**Qwik Framework**: Uses resumable architecture with server-side rendering. Components use `component$()` wrapper and signals for reactivity.

**Route Structure**: 
- Dynamic routes use `[id]` syntax (e.g., `/rifa/public/[id]/`)
- Route loaders (`routeLoader$`) handle server-side data fetching
- Layout components provide shared structure

**State Management**: Uses Qwik signals (`useSignal`) for reactive state management instead of traditional React-style hooks.

**Supabase Integration**: Database operations are handled through route loaders on the server side to ensure data is available at render time.

### Environment Configuration

Required environment variables (configured in vite.config.ts):
- `PUBLIC_SUPABASE_URL` - Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `ENVIRONMENT` - Environment identifier (defaults to 'development')

### Database Schema Context

The app expects these Supabase tables/views:
- `raffles` - Main raffle data with fields like title, description, banner_url
- `payment_raffle_options_view` - Payment options with amount, currency, instructions

## Deployment Notes

- Configured for Cloudflare Pages deployment using static adapter
- Wrangler 3.0 is used for deployment and local preview
- Build output goes to `dist/` directory
- Static files are served from `public/` directory with proper caching headers