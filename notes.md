# Notes

- https://dev.to/tmns/usecanceltoken-a-custom-react-hook-for-cancelling-axios-requests-1ia4

### What problem does this solve?

Sometimes this warning appears:

`Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.`

We are attempting to update state within the callback of a network request after the component has been destroyed.

For example, we make a request to an API and the component unmounts while the network request is still in progress. So the component may be gone but that callback is still hanging and waiting to get executed.

The solution is to ensure that whenever our component unmounts, we cancel our pending request:

Before we send the request, create a source variable holding the result of axios.CancelToken.source, which is like a reference that we can associate with our request.

Then, along with our request we send an extra piece of data, `{ cancelToken: source.token }`, containing the source's token.

Make sure to return a function from our useEffect that cancels our source's token:
return () => source.cancel();
