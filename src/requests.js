const superagent = require("superagent");
require("dotenv").config();

const port =
	process.env.NODE_ENV === "fly"
		? "https://namespace-db.fly.dev"
		: "http://localhost:4004";

var root = {
	postCreateIssue: async (repo, issue_id, tsrc_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ createIssue(repo: "${repo}", issue_id: "${issue_id}", tsrc_id: "${tsrc_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.createIssue;
	},
	postGetIssueID: async (repo, tsrc_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getIssueID(repo: "${repo}", tsrc_id: "${tsrc_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getIssueID;
	},
	postGetTsrcID: async (repo, issue_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getTsrcID(repo: "${repo}", issue_id: "${issue_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getTsrcID;
	},
	getGitHubPullRequest: async (owner, repo, pull, accessToken) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getGitHubPullRequest(owner: "${owner}", repo: "${repo}", pull: "${pull}", accessToken: "${accessToken}")
        {
          url,
          id,
          node_id,
          html_url,
          diff_url,
          patch_url,
          issue_url,
          number,
          state,
          locked,
          title,
          user {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            site_admin
          },
          body,
          created_at,
          updated_at,
          closed_at,
          merged_at,
          merge_commit_sha,
          assignee {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            site_admin
          },
          assignees {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            site_admin
          },
          requested_reviewers {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            site_admin
          },
          draft,
          commits_url,
          review_comments_url,
          review_comment_url,
          comments_url,
          statuses_url,
          head {
            label,
            ref,
            sha,
            user {
              login,
              id,
              node_id,
              avatar_url,
              gravatar_id,
              url,
              html_url,
              followers_url,
              following_url,
              gists_url,
              starred_url,
              subscriptions_url,
              organizations_url,
              repos_url,
              events_url,
              received_events_url,
              site_admin
            },
            repo {
              id,
              node_id,
              name,
              full_name,
              private,
              owner {
                login,
                id,
                node_id,
                avatar_url,
                gravatar_id,
                url,
                html_url,
                followers_url,
                following_url,
                gists_url,
                starred_url,
                subscriptions_url,
                organizations_url,
                repos_url,
                events_url,
                received_events_url,
                site_admin
              },
              html_url,
              description,
              fork,
              url,
              forks_url,
              keys_url,
              collaborators_url,
              teams_url,
              hooks_url,
              issue_events_url,
              events_url,
              assignees_url,
              branches_url,
              tags_url,
              blobs_url,
              git_tags_url,
              git_refs_url,
              trees_url,
              statuses_url,
              languages_url,
              stargazers_url,
              contributors_url,
              subscribers_url,
              subscription_url,
              commits_url,
              git_commits_url,
              comments_url,
              issue_comment_url,
              contents_url,
              compare_url,
              merges_url,
              archive_url,
              downloads_url,
              issues_url,
              pulls_url,
              milestones_url,
              notifications_url,
              labels_url,
              releases_url,
              deployments_url,
              created_at,
              updated_at,
              pushed_at,
              git_url,
              ssh_url,
              clone_url,
              svn_url,
              homepage,
              size,
              stargazers_count,
              watchers_count,
              language,
              has_issues,
              has_projects,
              has_downloads,
              has_wiki,
              has_pages,
              has_discussions,
              forks_count,
              mirror_url,
              archived,
              disabled,
              open_issues_count,
              license {
                key,
                name,
                spdx_id,
                url,
                node_id
              },
              allow_forking,
              is_template,
              web_commit_signoff_required,
              topics,
              visibility,
              forks,
              open_issues,
              watchers,
              default_branch
            }
          },
          base {
            label,
            ref,
            sha,
            user {
              login,
              id,
              node_id,
              avatar_url,
              gravatar_id,
              url,
              html_url,
              followers_url,
              following_url,
              gists_url,
              starred_url,
              subscriptions_url,
              organizations_url,
              repos_url,
              events_url,
              received_events_url,
              site_admin
            },
            repo {
              id,
              node_id,
              name,
              full_name,
              private,
              owner {
                login,
                id,
                node_id,
                avatar_url,
                gravatar_id,
                url,
                html_url,
                followers_url,
                following_url,
                gists_url,
                starred_url,
                subscriptions_url,
                organizations_url,
                repos_url,
                events_url,
                received_events_url,
                site_admin
              },
              html_url,
              description,
              fork,
              url,
              forks_url,
              keys_url,
              collaborators_url,
              teams_url,
              hooks_url,
              issue_events_url,
              events_url,
              assignees_url,
              branches_url,
              tags_url,
              blobs_url,
              git_tags_url,
              git_refs_url,
              trees_url,
              statuses_url,
              languages_url,
              stargazers_url,
              contributors_url,
              subscribers_url,
              subscription_url,
              commits_url,
              git_commits_url,
              comments_url,
              issue_comment_url,
              contents_url,
              compare_url,
              merges_url,
              archive_url,
              downloads_url,
              issues_url,
              pulls_url,
              milestones_url,
              notifications_url,
              labels_url,
              releases_url,
              deployments_url,
              created_at,
              updated_at,
              pushed_at,
              git_url,
              ssh_url,
              clone_url,
              svn_url,
              homepage,
              size,
              stargazers_count,
              watchers_count,
              language,
              has_issues,
              has_projects,
              has_downloads,
              has_wiki,
              has_pages,
              has_discussions,
              forks_count,
              mirror_url,
              archived,
              disabled,
              open_issues_count,
              license {
                key,
                name,
                spdx_id,
                url,
                node_id
              },
              allow_forking,
              is_template,
              web_commit_signoff_required,
              topics,
              visibility,
              forks,
              open_issues,
              watchers,
              default_branch
            }
          },
          _links {
            self {
              href
            },
            html {
              href
            },
            issue {
              href
            },
            comments {
              href
            },
            review_comments {
              href
            },
            review_comment {
              href
            },
            commits {
              href
            },
            statuses {
              href
            }
          },
          author_association,
          auto_merge,
          active_lock_reason,
          merged,
          mergeable,
          rebaseable,
          mergeable_state,
          merged_by {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            site_admin
          },
          comments,
          review_comments,
          maintainer_can_modify,
          commits,
          additions,
          deletions,
          changed_files
        }
      }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getTsrcID;
	},
};

module.exports = root;
