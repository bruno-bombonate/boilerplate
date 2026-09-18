import { Service, signal, computed } from '@angular/core';

@Service()
export class LoadingService {

  private readonly loadingRequestCount = signal<number>(0);

  public readonly loading = computed<boolean>(() => this.loadingRequestCount() > 0);

  public addLoadingRequest(): void {
    this.loadingRequestCount.update((loadingRequestCount) => loadingRequestCount + 1);
  }

  public removeLoadingRequest(): void {
    this.loadingRequestCount.update((loadingRequestCount) => Math.max(0, loadingRequestCount - 1));
  }

}
