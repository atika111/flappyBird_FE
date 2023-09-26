import { useContext, useEffect } from 'react';
import { ScoreContext } from '../Context/MyScoreProvider';
import { AuthContext } from '../Context/MyAuthProvider';

const scorePage = () => {
  const { score, fetchScore } = useContext(ScoreContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className='dash-box'>
      <h1 className='dasch' style={{ marginBottom: '20px' }}>
        Highest score
      </h1>
      <section
        className='score-table'
        style={{ marginBottom: '20px', fontSize: '2rem' }}
      >
        {score.sort((a, b) => b.score - a.score).slice(0, 1)[0].score}
      </section>
      <h1 className='dasch'>Your score</h1>
      <section className='score-table'>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {score
              .filter((item) => item.nickname === user?.nickname)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.nickname}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <h1 className='dasch'>History score of all users</h1>
      <section className='score-table'>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {score.map((item, index) => (
              <tr key={index}>
                <td>{item.nickname}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default scorePage;
