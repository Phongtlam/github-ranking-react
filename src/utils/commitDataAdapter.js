export default (data) => {
  const author = (data && data.author) || {};
  const commit = (data && data.commit) || {};
  const getCommitDate = commit.author && commit.author.date;
  return {
    author: {
      id: author.id,
      login: author.login,
      profileUrl: author.html_url,
      type: author.type,
      email: commit.author && commit.author.email,
      name: commit.author && commit.author.name,
    },
    commit: {
      message: commit.message,
      commitUrl: data.html_url,
      parents: data.parents,
      sha: data.sha,
      verified: !!(data.commit && data.commit.verification && data.commit.verification.verified),
      date: getCommitDate && new Date(getCommitDate).toDateString()
    },
  };
};
