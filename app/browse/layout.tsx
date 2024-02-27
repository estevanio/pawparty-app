export default function Layout({ children }: { children: React.ReactNode }) {
return (
  <>
    <div id="root"></div>
    <div className="container">
        {children}
      <div className="bottom-nav">
        <a href="index.html">
          <img className="" src="/home-icon.svg" alt="home" />
        </a>
        <a href="matches.html">
          <img className="" src="/matches-icon.svg" alt="matches" />
        </a>
      </div>
    </div>
  </>
);
}

