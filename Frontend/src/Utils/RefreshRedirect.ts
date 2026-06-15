export function redirectOnRefreshIfNeeded(targetRoute: string): void {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navEntry?.type !== "reload") return;
    if (window.location.pathname === targetRoute) return;

    window.history.replaceState(null, "", targetRoute);
}
