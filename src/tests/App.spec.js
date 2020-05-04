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

  it('should render' , () => {
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

  // describe('getOrgRepos', () => {
  //   fetch.get = jest.fn();
  //   it('should not call fetch if orgName is the same and data exists in reposPages', () => {
  //     instance.setState({
  //       organization: 'org'
  //     });
  //     instance.reposPages.put(1, [{}]);
  //     instance.reposPages.put(2, [{ a: 'hello' }]);
  //     instance.getOrgRepos('org', 1);
  //     expect(fetch.get).not.toHaveBeenCalled;
  //   });
  // })
});
