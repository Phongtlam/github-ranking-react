import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

import RadioGroup from '../components/RadioGroup';
import radioEnums from "../enums/radioGroup";
import RepositoriesList from "../components/RepositoriesList";
import CommitsList from "../components/CommitsList";
import fetch from "../utils/fetch";

describe('App', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<App />);
    instance = component.instance();
  })

  it('should render', () => {
    expect(component).toBeDefined();
    expect(instance).toBeDefined();
    expect(component.find(RadioGroup)).toBeDefined();
    expect(component.find(RepositoriesList)).toBeDefined();
    expect(component.find(CommitsList)).toBeDefined();
  });

  it('renders with correct initial State', () => {
    expect(instance.state).toStrictEqual({
      organization: '',
      totalReposPage: 1,
      currentReposPage: 1,
      totalCommitsPage: 1,
      currentCommitsPage: 1,
      repositories: [],
      currentCommitsList: [],
      radioGroup: [radioEnums.FORKS, radioEnums.STARS],
      currentRadioSelected: radioEnums.FORKS,
    });
  });

  describe('getOrgRepos', () => {
    it('should not call fetch if orgName is the same and data exists in reposPages', () => {
      instance.setState({
        organization: 'org'
      });
      instance.reposPages.put(1, [{}]);
      instance.reposPages.put(2, [{ a: 'hello' }]);
      instance.getOrgRepos('org', 1);
      expect(fetch.get).not.toHaveBeenCalled;
    });

    it('should call fetch if orgName new', () => {
      fetch.get = jest.fn(() => ({
        then: () => {}
      }));
      instance.setState({
        organization: 'org'
      });
      instance.reposPages.put(1, [{}]);
      instance.reposPages.put(2, [{ a: 'hello' }]);
      instance.getOrgRepos('org1', 1);
      expect(fetch.get).toHaveBeenCalled;
    });

    it('should call fetch if reposPages does not have the available page', () => {
      fetch.get = jest.fn(() => ({
        then: () => {}
      }));
      instance.setState({
        organization: 'org'
      });
      instance.reposPages.put(1, [{}]);
      instance.reposPages.put(2, [{ a: 'hello' }]);
      instance.getOrgRepos('org1', 3);
      expect(fetch.get).toHaveBeenCalled;
    });
  });

  describe('onRadioClick', () => {
    const repos = [
      { forks_count: 2, stargazers_count: 3 },
      { forks_count: 1, stargazers_count: 4 },
      { forks_count: 4, stargazers_count: 1 },
      { forks_count: 3, stargazers_count: 2 },
    ];

    it('sort values by stars count', () => {
      instance.setState({
        repositories: repos
      });
      Promise.resolve(
        instance.onRadioClick({
          target: { value: radioEnums.STARS }
        })
      )
        .then(() => {
          expect(instance.state.currentRadioSelected).toBe(radioEnums.STARS);
          expect(instance.state.repositories).toStrictEqual(repos.sort((a, b) => b.stargazers_count - a.stargazers_count))
        })
    });

    it('sort value by forks count', () => {
      instance.setState({
        repositories: repos
      });
      Promise.resolve(
        instance.onRadioClick({
          target: { value: radioEnums.FORKS }
        })
      )
        .then(() => {
          expect(instance.state.currentRadioSelected).toBe(radioEnums.FORKS);
          expect(instance.state.repositories).toStrictEqual(repos.sort((a, b) => b.forks_count - a.forks_count))
        })
    });
  });

  describe('getRepoCommits', () => {
    fetch.get = jest.fn(() => ({
      then: () => {}
    }));

    it('should not fetch if organization name and repoName exists in cache', () => {
      instance.setState({
        organization: 'org'
      });
      instance.commits.put('hello', [{}]);
      instance.getRepoCommits('org', 'hello');
      expect(fetch.get).not.toHaveBeenCalled;
    });

    it('should fetch if organization name has change', () => {
      instance.setState({
        organization: 'org'
      });
      instance.commits.put('hello', [{}]);
      instance.getRepoCommits('org1', 'hello');
      expect(fetch.get).toHaveBeenCalled;
    });

    it('should fetch if repoName is new', () => {
      instance.setState({
        organization: 'org'
      });
      instance.commits.put('hello', [{}]);
      instance.getRepoCommits('org', 'hello1');
      expect(fetch.get).toHaveBeenCalled;
    });
  })
});
