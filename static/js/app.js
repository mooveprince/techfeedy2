var app = new Vue( {
    el : '#root',
    data : {
        hackernewsResults: [],
        techmemeResults: [],
        techcrunchResults: [],
        producthuntResults: []
    },
    mounted () {
        this.getTrendingTopics( );
    },
    methods : {
        getTrendingTopics ( ) {

            //hackernews
            axios.get ("https://techfeedyservice.herokuapp.com/hackernews")
                .then(response => {this.hackernewsResults = response.data})
                .catch(error => console.log(error));
            
            //techmeme
            axios.get ("https://techfeedyservice.herokuapp.com/techmeme")
                .then(response => {this.techmemeResults = response.data})
                .catch(error => console.log(error));       

            //techcrunch
            axios.get ("https://techfeedyservice.herokuapp.com/techcrunch")
                .then(response => {this.techcrunchResults = response.data})
                .catch(error => console.log(error));   

            //producthunt
            axios.get ("https://techfeedyservice.herokuapp.com/producthunt")
                .then(response => {this.producthuntResults = response.data})
                .catch(error => console.log(error));                                      
        }
    }
});

Vue.component('hacker-news', simpleRender());
Vue.component('tech-meme', simpleRender());
Vue.component('tech-crunch', simpleRender());
Vue.component('product-hunt', {
        props: ['results'],
        template : `<div class="list-group feedData">
                        <div v-for="result in processTopics">
                            <a :href="result.redirect_url" target="_blank" class="list-group-item list-group-item-action" target="_blank">{{ result.name }} <span> -  {{ result.tagline }} </span> </a> 
                        </div>
                    </div>`,
        computed : {
            processTopics () {
                return this.results.slice(0,11); }
        }
})

function simpleRender () {
    return {
        props: ['results'],
        template : `<div class="list-group feedData">
                        <div v-for="result in processTopics">
                            <a :href="result.link" target="_blank" 
                                class="list-group-item list-group-item-action">{{result.title}}
                            </a>
                        </div>
                    </div>`,
        computed : {
            processTopics () {
                return this.results.slice(0,11); }
        }
    }

}
