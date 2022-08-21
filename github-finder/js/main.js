$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        if (e.key == "Enter") {
            let username = e.target.value;
            console.log('Username: ' + username);
            // make a github request
            $.ajax({
                url: 'https://api.github.com/users/' + username,
                data: {
                    client_id: '41fa719c65cd77b6e6d4',
                    client_secret: '130946e6f3024c6aa4ead6136662cabfbd51b620',
                }
            }).done(function (user) {
                $.ajax({
                    url: 'https://api.github.com/users/' + username + '/repos',
                    data: {
                        client_id: '41fa719c65cd77b6e6d4',
                        client_secret: '130946e6f3024c6aa4ead6136662cabfbd51b620',
                        sort: 'created: desc',
                        per_page: 10,
                    }
                }).done(function (repos) {
                    $.each(repos, function (key, repo) {
                        $('#repos').append(
                            `
                                    <div class="well">
                                        <div class="row"> 
                                            <div class="col-md-7">
                                                <strong>${repo.name}</strong>: ${repo.description}
                                                <br>
                                                <ul class="repo-info">
                                                    <li>Languages: ${repo.language}</li>
                                                    <li>Visibility: ${repo.visibility}</li>
                                                    <li>Default branch: ${repo.default_branch}</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="label label-primary">Watchers: ${repo.watchers}</span>
                                                <span class="label label-success">Forks: ${repo.froks}</span>
                                                <span class="label label-danger">Stargazers: ${repo.stargazers_count}</span>
                                                <span class="label label-default">Size: ${repo.size}</span>
                                            </div>
                                            <div class="col-md-2">
                                                <a href="${repo.html_url}" class="btn btn-danger btn-block" target="_blank">Load Repo</a>
                                            </div>
                                        </div>
                                    </div>
                                    `
                        )
                    });
                });
                $('#profile').html(`
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">${user.name}</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <img class="thumbnail avatar" src="${user.avatar_url}">
                                            <a href="${user.html_url}" class="btn btn-danger btn-block" target="_blank">Profile</a>
                                        </div>
                                        <div class="col-md-9">
                                                <span class="label label-primary">Public Repos: ${user.public_repos}</span>
                                                <span class="label label-success">Public Gists: ${user.public_gists}</span>
                                                <span class="label label-danger">Followers: ${user.followers}</span>
                                                <span class="label label-default">Following: ${user.following}</span>
                                            <br><br>
                                            <h2> Description </h2>
                                            <ul class="list-group">
                                                <li class="list-group-item">Location: ${user.location}</li>
                                                <li class="list-group-item">Company: ${user.company}</li>
                                                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                                <li class="list-group-item">Organizations: ${user.organizations_url}</li>
                                                <li class="list-group-item">Subscriptions: ${user.subscriptions_url}</li>
                                                <i><li class="list-group-item">${user.type}</li></i>
                                            </ul>
                                            <h2> Contact </h2>
                                            <ul class="list-group">
                                                <li class="list-group-item">Bio: ${user.bio}</li>
                                                <li class="list-group-item">Email: ${user.email}</li>
                                                <li class="list-group-item">Twitter: ${user.twitter_username}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3> Latest Repos </h3>
                            <div id="repos"></div>
                        `);
            });
        }
    });

});