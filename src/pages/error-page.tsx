import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const status = (error as { status: number }).status;
  const data = (error as { data: string }).data;

  return (
    <div id="error-page" className="container text-center py-16">
      <h1 className="text-4xl mb-4">Oops!</h1>
      <p className="mb-4">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {status}: {data}
        </i>
      </p>
    </div>
  );
}
