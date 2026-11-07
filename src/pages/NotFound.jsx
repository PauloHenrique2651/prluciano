import { SmartLink, useSeo } from "../components/ui.jsx";

export default function NotFound() {
  useSeo({ title: "Page not found | Eternal Eleven Agency", path: "/404" });
  return (
    <section className="page-head" style={{ minHeight: "80svh" }}>
      <div className="wrap">
        <p className="kicker">Off the pitch</p>
        <h1 className="display d-xl" style={{ marginTop: 20 }}>This page isn't in play.</h1>
        <p className="lede">The link may be old or mistyped. Head back to the program or start an application.</p>
        <div className="btn-row">
          <SmartLink to="/" className="btn btn-gold btn-lg">Go to the home page</SmartLink>
          <SmartLink to="/application-enrollment" className="btn btn-ghost btn-lg">Apply now</SmartLink>
        </div>
      </div>
    </section>
  );
}
