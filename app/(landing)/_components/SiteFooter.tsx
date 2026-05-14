import { footer } from "../_data/course";

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="bg-usrc-crimson"
    >
      <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-3 px-5 py-8 md:flex-row md:items-center md:px-8 lg:px-12">
        <p className="text-small text-white/90">{footer.left}</p>
        <p className="text-small text-white/60">{footer.right}</p>
      </div>
    </footer>
  );
}
