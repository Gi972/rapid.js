import test from 'ava';
import Rapid from './../src/rapid';

class GalleryWrapper extends Rapid {
    boot () {
        this.baseURL = 'https://mysite.com/api';
        this.modelName = 'Gallery';
    }

    tagSearch (query) {
        return this.append('tagsearch').withParam('query', query);
    }

    categorySearch (query) {
        return this.append('categorysearch').withParam('query', query);
    }

    paginate (pagination) {
        return this.withParams(pagination);
    }

    taxonomy (taxonomy) {
        return this.append(taxonomy);
    }

    json () {
        return this.append('json');
    }

    xml () {
        return this.append('xml');
    }
}

test('extending and creating a wrapper works', t => {
    var wrapper = new GalleryWrapper({
        globalParameters: {
          key: 'YOUR_API_KEY'
        },
        debug: true
    });
    wrapper.debugger.logEnabled = false;

    wrapper.tagSearch('orange').json().get();
    t.is('https://mysite.com/api/gallery/tagsearch/json?query=orange&key=YOUR_API_KEY', wrapper.debugger.data.lastUrl);


    wrapper.categorySearch('nature').xml().get();
    t.is('https://mysite.com/api/gallery/categorysearch/xml?query=nature&key=YOUR_API_KEY', wrapper.debugger.data.lastUrl);


    wrapper.id(45).taxonomy('tags').json().get();
    t.is('https://mysite.com/api/gallery/45/tags/json?key=YOUR_API_KEY', wrapper.debugger.data.lastUrl);


    wrapper.id(45).taxonomy('categories').xml().get();
    t.is('https://mysite.com/api/gallery/45/categories/xml?key=YOUR_API_KEY', wrapper.debugger.data.lastUrl);

    wrapper.id(45).paginate({ page: 1, perPage: 20 }).xml().get();
    t.is('https://mysite.com/api/gallery/45/xml?page=1&perPage=20&key=YOUR_API_KEY', wrapper.debugger.data.lastUrl);

});
