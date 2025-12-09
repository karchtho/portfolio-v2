# PORTFOLIO CONTENT
Title Options:
"Claude MCP Course Manager" (descriptive)
"EduMCP - AI-Powered Course Database" (catchy)
"MCP Course Repository System" (professional)
"Cours-MCP: Educational Content Management via AI" (detailed)
Recommended: "MCP Course Manager - AI-Integrated Educational Database"

Tags (Technologies):
```
#Python #MCP #ModelContextProtocol #Flask #MySQL #AI #ClaudeAI 
#RestAPI #WebDevelopment #DatabaseManagement #FullTextSearch 
#AsyncIO #StdIO #Education #CourseManagement #ngrok
```

**Core Stack:**
Python 3.8+
Flask 3.0
PyMySQL 1.1
MCP SDK 0.9
MySQL 8.0

### Short Description (2-3 sentences):
An educational course management system that integrates Claude AI with a MySQL 
database through the Model Context Protocol (MCP). Enables AI-powered course 
search and management via multiple interfaces: MCP tools for Claude, Flask web 
UI, and REST API.

### Alternative (more technical):

MCP server implementation providing Claude AI with persistent database access 
for educational content management. Features full-text search, multi-file 
uploads, and three distinct interfaces (stdio MCP, web UI, HTTP adapter) 
accessing a unified MySQL backend.

### Long Description (What it does + Current state):
## Overview
MCP Course Manager is a multi-interface educational content management system 
that demonstrates practical Model Context Protocol (MCP) implementation. The 
project bridges AI capabilities with traditional database systems, allowing 
Claude AI to search, add, and manage educational courses stored in MySQL.

## What It Does
The system provides three distinct access methods to a centralized course 
database:

1. **MCP Server (stdio)**: Exposes custom tools that enable Claude AI to 
   perform natural language course searches and add new content directly 
   through conversation.

2. **Flask Web Interface**: User-friendly web UI for uploading markdown/text 
   course files, manual course entry, and browsing the complete course catalog.

3. **HTTP REST API**: Adapter layer exposing MCP tools as HTTP endpoints for 
   integration with external systems.

## Key Features
- Full-text search across course titles, subjects, and content
- Multi-file upload support (.md, .txt)
- Course categorization (cours/exercice/corrigé)
- Real-time AI integration via MCP protocol
- Public access support through ngrok tunneling
- Database indexing for optimized query performance

## Technical Implementation
Built with Python's async/await patterns for the MCP server component, 
synchronous Flask for web interfaces, and PyMySQL for database connectivity. 
Implements proper SQL parameterization and includes comprehensive startup 
documentation for easy deployment.

## Current State
**Status**: Educational/Development Stage

The project successfully demonstrates MCP integration patterns and is fully 
functional for local development and learning purposes. The codebase is clean 
and well-documented with a comprehensive setup guide.

**Known Limitations**:
- Security hardening required for production use (authentication, input 
  validation, XSS protection)
- Debug mode enabled (suitable for development only)
- No automated testing infrastructure
- Credentials management needs environment variable migration

**Ideal For**:
- Learning MCP protocol implementation
- Understanding AI-database integration patterns
- Local educational content management
- MCP server development reference

**Future Roadmap**:
- Security enhancements (authentication, input sanitization)
- Docker containerization
- Test coverage implementation
- Production-ready configuration management
- ORM integration (SQLAlchemy)


### Alternative "Honest" Portfolio Version:

## MCP Course Manager
**An experimental MCP server exploring AI-database integration patterns**

### What I Built
This project explores the Model Context Protocol by creating a practical 
educational course management system. It demonstrates how to extend Claude AI's 
capabilities with custom database tools, while also providing traditional web 
and API interfaces.

### The Challenge
How do you give an AI assistant persistent memory and domain-specific tools? 
This project solves that by implementing MCP to connect Claude with a MySQL 
course database, enabling natural language queries like "find all Python courses" 
to execute actual database searches.

### Technical Approach
- **MCP Server**: Custom stdio-based tool provider for Claude integration
- **Flask Web UI**: Multi-file upload system with course categorization  
- **MySQL Backend**: Full-text indexed database with proper query parameterization
- **HTTP Adapter**: REST API wrapper (experimental async/sync bridging)

### What I Learned
- MCP protocol implementation and tool schema design
- Async/sync Python patterns and their interoperability challenges
- Database connection lifecycle management in multi-interface systems
- Security considerations in AI-integrated applications (XSS, auth, input validation)

### Current Status
✅ Functional for development and learning
⚠️ Requires security hardening for production (authentication, input validation, debug mode removal)
📚 Comprehensive documentation included
🧪 Testing infrastructure planned

**Lines of Code**: ~310 Python (across 4 modules)
**Setup Time**: <10 minutes with included startup guide


##  Suggested Portfolio Presentation Structure:
# MCP Course Manager

> AI-integrated educational database using Model Context Protocol

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)]()
[![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)]()
[![MCP](https://img.shields.io/badge/MCP-0.9-purple.svg)]()
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)]()

## 🎯 Quick Summary
[Short description here]

## 🔧 Technologies
- Python 3.8+, Flask, PyMySQL, MCP SDK
- MySQL 8.0, ngrok
- Async/Await, REST API, stdio communication

## ✨ Features
- [Bullet points]

## 🏗️ Architecture
[Optional diagram or explanation]

## 📸 Screenshots
[If applicable]

## 🚀 What I Learned
[Key takeaways]

## 📝 Status & Future Work
[Current state + roadmap]

## 🔗 Links
- [GitHub Repository](#)
- [Documentation](STARTUP_GUIDE.md)
