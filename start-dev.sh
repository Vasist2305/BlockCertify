#!/bin/bash

echo "========================================"
echo "  BlockCertify Development Server"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB..."
if ! mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo "[ERROR] MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  - Mac: brew services start mongodb-community"
    echo "  - Linux: sudo systemctl start mongod"
    echo "  - Or run: mongod"
    echo ""
    exit 1
fi
echo "[OK] MongoDB is running"
echo ""

# Start backend in background
echo "Starting Backend Server..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "Starting Frontend Server..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Servers Started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "To stop servers:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Opening browser in 3 seconds..."
sleep 3

# Open browser (works on Mac and Linux)
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:5173
elif command -v open > /dev/null; then
    open http://localhost:5173
fi

echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
