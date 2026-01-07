import DynamicLoadingPage from '../../pages/herokuapp/DynamicLoadingPage';

describe('Herokuapp - Dynamic Loading', () => {
  it('Example 1: element exists but is hidden, then appears', () => {
    DynamicLoadingPage.visitExample(1);
    DynamicLoadingPage.start();
    DynamicLoadingPage.waitForLoadingToFinish();
    DynamicLoadingPage.assertFinishedText('Hello World!');
  });

  it('Example 2: element is rendered after loading completes', () => {
    DynamicLoadingPage.visitExample(2);
    DynamicLoadingPage.start();
    DynamicLoadingPage.waitForLoadingToFinish();
    DynamicLoadingPage.assertFinishedText('Hello World!');
  });
});
