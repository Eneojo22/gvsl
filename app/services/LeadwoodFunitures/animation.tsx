export default class FadeInAnimation {
  private node: HTMLElement;
  private duration: number = 0;
  private startTime: number | null = null;
  private frameId: number | null = null;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  start(duration: number) {
    this.duration = duration;

    if (this.duration === 0) {
      this.onProgress(1);
    } else {
      this.onProgress(0);
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(this.onFrame.bind(this));
    }
  }

  private onFrame() {
    if (!this.startTime) return;

    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);

    if (progress < 1) {
      this.frameId = requestAnimationFrame(this.onFrame.bind(this));
    }
  }

  private onProgress(progress: number) {
    this.node.style.opacity = progress.toString();
  }

  stop() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
