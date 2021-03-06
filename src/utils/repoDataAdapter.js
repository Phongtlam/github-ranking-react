import getReadableDate from './getReadableDate.js';

export default (data) => ({
  id: data.id,
  name: data.name,
  forks_count: data.forks_count,
  stargazers_count: data.stargazers_count,
  html_url: data.html_url,
  description: data.description,
  updated_at: data.updated_at,
  full_name: data.full_name,
  updated_at_integer: new Date(data.updated_at).getTime(),
  updated_at_readable: getReadableDate(data.updated_at),
  created_at_readable: getReadableDate(data.created_at),
  pushed_at_readable: getReadableDate(data.pushed_at),
  language: data.language,
  open_issues_count: data.open_issues_count,
  license: data.license && data.license.name,
});
