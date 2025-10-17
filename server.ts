// server.ts - Next.js Standalone + Socket.IO (Render-ready)
import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Écoute toutes les interfaces
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000; // Port dynamique pour Render

async function createCustomServer() {
  try {
    // Initialisation de Next.js
    const nextApp = next({ 
      dev,
      dir: process.cwd(),
      conf: { distDir: '.next' } 
    });
    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    // Création du serveur HTTP
    const server = createServer((req, res) => handle(req, res));

    // Configuration de Socket.IO
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    setupSocket(io);

    // Démarrage du serveur
    server.listen(port, hostname, () => {
      console.log(`> Next.js ready on http://localhost:${port}`);
      console.log(`> Socket.IO running at ws://localhost:${port}/api/socketio`);
    });

  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

// Lancement du serveur
createCustomServer();
