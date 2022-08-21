$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;
        // make a github request
        $.getJSON('../users.json', function (users) {
            $.each(users, function (key, user) {
                if (user.login.includes(username)) {
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
                                <div>
                                    <div class="row"> 
                                        < class="col-md-7">
                                            <strong>${repo.name}</strong>: ${repo.description}
                                            <br>
                                            <span>Languages: ${repo.languages}</span>
                                        </div>
                                        <div class="col-md-4">
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
                                <h3 class="panel-title">${user.login}</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img class="thumbnail avatar" src="${user.avatar_url}">
                                        <a href="${user.html_url}" class="btn btn-danger btn-block" target="_blank">Profile</a>
                                    </div>
                                    <div class="col-md-9">
                                        <span class="label label-default"><a id="lb" href="${user.repos_url}">Public Repos</a></span>
                                        <span class="label label-primary"><a id="lb" href="${user.gists_url}">Public Gists</a></span>
                                        <span class="label label-success"><a id="lb" href="${user.followers_url}">Followers</a></span>
                                        <span class="label label-danger"><a id="lb" href="${user.following_url}">Following</a></span>
                                        <br><br>
                                        <h1> Description </h1>
                                        <ul class="list-group">
                                            <li class="list-group-item">Cras justo odio</li>
                                            <li class="list-group-item">Dapibus ac facilisis in</li>
                                            <li class="list-group-item">Morbi leo risus</li>
                                            <li class="list-group-item">Porta ac consectetur ac</li>
                                            <li class="list-group-item">Vestibulum at eros</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3> Latest Repos </h3>
                        <div id="repos"></div>
                    `);
                }
            });
        });
    });
});