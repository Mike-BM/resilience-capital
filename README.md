# Resilience Capital

Resilience Capital is a climate-adaptive micro-lending platform designed for off-grid solar vendors in regions exposed to drought and climate risks. Instead of rejecting vendors based on climate risk, we model the risk and turn it into our edge.

## Tech Stack

### Frontend
- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (React + SSR)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: SQLite with [SQLAlchemy](https://www.sqlalchemy.org/)
- **Features**: Parametric insurance payouts, drought forecasting (via Open-Meteo), and climate-adapted dynamic loan pricing.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Seed the database:
   ```bash
   python seed.py
   ```
5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

## Key Features
- **Adaptive Repayment**: Monthly payments adjust dynamically based on climate data. During drought months, payments drop, allowing vendors to keep stock instead of defaulting.
- **Parametric Insurance**: Automatic payouts triggered when the drought index hits critical levels, requiring no manual claims process.
- **Resilience Scoring**: Vendor creditworthiness is evaluated using a combination of business fundamentals, satellite data, mobile money behavior, and community references.
- **Carbon Credit Revenue**: Financed solar panels generate carbon credits, paying vendors for avoided emissions.

## License
MIT
