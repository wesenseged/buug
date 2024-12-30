# Buug

Buug is a free and versatile application designed to revolutionize task management, project planning, markdown writing, and progress visualization. Whether you're a student, developer, or professional, Buug helps you stay organized and track every step of your work effectively.

## Features

- **Daily Tasks**: Manage your daily tasks with ease.
- **Project Manager**: Organize tasks and notes under corresponding projects, ensuring traceability and a structured workflow.
- **Note-Taking with Markdown**: Create, edit, and manage notes using markdown syntax.
- **Progress Visualization**: Use charts to track and visualize progress.
- **Vim Keybindings**: Navigate the app seamlessly using Vim-style shortcuts.
- **AI Integration**: Enhance your productivity with AI-powered features.

## Tech Stack

- **Frontend**: React
- **Backend**: Bun with Hono
- **Database**: PostgreSQL (Neon) with Drizzle ORM

## Installation & Setup

Currently, Buug is available as a web app. You can also clone the repository and run it locally:

### Prerequisites

- Bun
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/wesenseged/buug
   ```
2. Navigate to the project directory:
   ```bash
   cd buug
   ```
3. Install server dependency:
   ```bash
   bun install
   ```
4. Build the server:
   ```bash
   bun build
   ```
5. Navigate to the project directory:
   ```bash
   cd client
   ```
5. Install client dependency:
   ```bash
   bun install
   ```
6. Build client:
   ```bash
   bun build
   ```
8. Set up a `.env` file with the following variable for local development:
   ```env
   DATABASE_URL=<your-neon-postgres-url>
   PORT=<port number>
   ```

7. Start the development server:
   ```bash
   bun start
   ```
In the future, Docker support will be added for easier setup.

## Usage

Buug is divided into four main sections:

1. **Daily Tasks**: Add and manage tasks for your daily activities.
2. **Project Manager**: Create projects and associate tasks and notes with them. Projects act as parents, and tasks/notes are their children.
3. **Note-Taking**: Use markdown to write detailed notes and documentation.
4. **Progress Visualization**: View charts that showcase your progress over time.

## Documentation

Visit the Buug documentation for detailed guides and examples, including a markdown cheat sheet:

- [Documentation](https://buug-doc.netlify.app/)
- [Landing Page](https://buuug.netlify.app/)

## Contribution

Contributions are welcome! You can report issues or suggest features through GitHub. Refer to the contribution guidelines in the repository.

## Future Plans

- Docker support for seamless deployment.
- Enhanced AI integration for smarter task and project management.
- Additional features based on user feedback.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Start using Buug today and streamline your workflow!


