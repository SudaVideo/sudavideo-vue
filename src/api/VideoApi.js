import service from '../util/Request';


let VideoApi = {
    getSources() {
        return new Promise((resolve) => {
            return service.get("source").then(res => {
                resolve(res.data);
            });
        });
    },
    getVideosByType(type, source, page) {
        return new Promise((resolve) => {
            return service.get("page", {
                params: {
                    source: source,
                    type: type,
                    pageIndex: page
                }
            }).then(res => {
                resolve(res.data);
            });
        });
    },
    getVideoDetail(videoId, source) {
        return new Promise((resolve) => {
            return service.get("detail", {
                params: {
                    videoId: videoId,
                    source: source
                }
            }).then(res => {
                resolve(res.data);
            });
        });
    },
    getVideoPlayUrl(videoId, seriesId, source) {
        return new Promise((resolve) => {
            return service.get("playUrl", {
                params: {
                    videoId: videoId,
                    seriesId: seriesId,
                    source: source
                }
            }).then(res => {
                resolve(res.data);
            });
        });
    },
    searchVideoByName(videoName) {
        return new Promise((resolve) => {
            return service.get("search", {
                params: {
                    videoName: videoName
                }
            }).then(res => {
                resolve(res.data);
            });
        });
    }
}
export default VideoApi
