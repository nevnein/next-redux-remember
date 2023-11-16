import { increment, incrementClient, useTypedSelector, wrapper } from 'lib/store';
import { useDispatch } from 'react-redux';

const Page = () => {
  const serverState = useTypedSelector((state) => state.fromServer.value);
  const clientState = useTypedSelector((state) => state.fromClient.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Page</h1>

      <h2>Server</h2>
      <p>{serverState}</p>

      <h2>Client</h2>
      <p>{clientState}</p>
      <p>
        <button onClick={() => dispatch(incrementClient())}>
          Increment client
        </button>
      </p>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  store.dispatch(increment());

  return {
    props: {},
  };
});

export default Page;
