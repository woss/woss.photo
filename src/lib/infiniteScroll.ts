// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function infiniteScroll(params: any) {
  const { fetch, element } = params;
  if (element) {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetch();
        }
      },
      { threshold: [0, 1.0] }
    );
    observer.observe(element); //Element of DOM
  }
}
