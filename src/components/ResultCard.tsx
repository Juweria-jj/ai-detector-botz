import { AlertTriangle, Bookmark, Check } from "lucide-react";
import type { DetectionResult } from "@/lib/detection";
import { verdictLabel } from "@/lib/detection";
import { Button } from "@/components/ui/button";

const verdictStyles: Record<DetectionResult["verdict"], { bar: string; text: string }> = {
  human: { bar: "bg-signal-safe", text: "text-signal-safe" },
  uncertain: { bar: "bg-signal-warn", text: "text-signal-warn" },
  ai: { bar: "bg-signal-alert", text: "text-signal-alert" },
};

export function ResultCard({
  result,
  onSave,
  saving,
  saved,
  saveLabel,
}: {
  result: DetectionResult;
  onSave?: () => void;
  saving?: boolean;
  saved?: boolean;
  saveLabel?: string;
}) {
  const styles = verdictStyles[result.verdict];

  return (
    <section className="lab-panel p-5" aria-live="polite">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            AI likelihood
          </p>
          <p className={`font-mono text-5xl font-semibold leading-none ${styles.text}`}>
            {result.score}
            <span className="text-lg text-muted-foreground">/100</span>
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${styles.text}`}>{verdictLabel(result.verdict)}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {result.confidence} confidence
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${styles.bar}`} style={{ width: `${result.score}%` }} />
      </div>

      <p className="mt-4 text-sm text-foreground">{result.summary}</p>

      <ul className="mt-4 space-y-2">
        {result.evidence.map((item, index) => (
          <li key={index} className="flex gap-2 font-mono text-xs leading-relaxed">
            <span className="text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Detection is probabilistic, never proof. Treat this as one signal among others, not a
        verdict about a person.
      </p>

      {onSave ? (
        <Button
          className="mt-4 w-full"
          variant="outline"
          onClick={onSave}
          disabled={saving || saved}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" aria-hidden /> Saved to history
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" aria-hidden /> {saveLabel ?? "Save to history"}
            </>
          )}
        </Button>
      ) : null}
    </section>
  );
}
