import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="120" r="120" />
      <rect x="0" y="255" rx="5" ry="5" width="280" height="30" />
      <rect x="0" y="305" rx="5" ry="5" width="280" height="90" />
      <rect x="0" y="425" rx="0" ry="0" width="90" height="25" />
      <rect x="120" y="415" rx="0" ry="0" width="160" height="45" />
    </ContentLoader>
  </div>
);
