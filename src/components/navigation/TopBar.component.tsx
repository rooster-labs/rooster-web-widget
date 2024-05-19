export function TopBar() {
  return (
    <div className="flex justify-between text-base">
      <h1 className="text-lg">Rooster Financial</h1>
      <FeatureOrIssueRequest />
    </div>
  );
}

export function FeatureOrIssueRequest() {
  return (
    <div className="tooltip tooltip-left" data-tip="Issue / Feature Request">
      <button className="btn btn-ghost h-8 min-h-8 w-7 rounded-full p-0">
        <a href="mailto:mathuransada@gmail.com?subject=[Issue / Feature Request]">
          @
        </a>
      </button>
    </div>
  );
}
