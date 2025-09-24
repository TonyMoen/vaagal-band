import { Link } from "react-router-dom";

/* Code inspired by Master React Router https://www.youtube.com/watch?v=c02YoWR9gSY&t=35s */

const NotFoundPage = () => {
  return (
    <div>
      <h1>Denne siden eksisterer ikke</h1>
      <Link to="/" className="btn">
        Tilbake til forsiden
      </Link>
    </div>
  );
};

export default NotFoundPage;
