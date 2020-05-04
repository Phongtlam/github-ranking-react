import repoDataAdapter from '../../utils/repoDataAdapter';
import repositories from '../mocks/repositories.js';

describe('repoDataAdapter', () => {
  it('should format data correctly for RepositoriesList', () => {
    const adaptedData = repositories.map((data) => repoDataAdapter(data));
    const keys = Object.keys(adaptedData[0]);
    const expectedKeys = [
      'id',
      'name',
      'forks_count',
      'stargazers_count',
      'html_url',
      'description',
      'updated_at',
      'updated_at_integer',
      'updated_at_readable',
    ];
    for (const key of keys) {
      expect(expectedKeys.indexOf(key)).not.toBe(-1);
    }
  });
});
