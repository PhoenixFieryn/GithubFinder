class GitHub {
    constructor() {
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }

    async getUser(user) {
        const profileResponse = await GitHub.getClientInfo()
            .then(response => fetch(`https://api.github.com/users/${user}?client_id=${response.clientID}&client_secret=${response.clientSecret}`));

        const repoResponse = await GitHub.getClientInfo()
            .then(response => fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${response.clientID}&client_secret=${response.clientSecret}`));

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        return {
            profile,
            repos
        }
    }

    // OAuth info, clientID and clientSecret
    // Does not hide in client browser!
    static async getClientInfo() {
        const response = await fetch('oauth.json');
        const result = await response.json();
        return result;
    }
}