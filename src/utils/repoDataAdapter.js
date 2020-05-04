export default data => ({
  id: data.id,
  name: data.name,
  forks_count: data.forks_count,
  stargazers_count: data.stargazers_count,
  html_url: data.html_url,
  description: data.description,
  updated_at: data.updated_at,
  updated_at_integer: new Date(data.updated_at).getTime(),
  updated_at_readable: new Date(data.updated_at).toDateString()
});
