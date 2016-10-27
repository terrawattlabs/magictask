angular.module('zapexApp')
.factory("LoginService", function () {
    var status = false;
     function getStatus() {
        return status;
    }
    function setStatus(newStatus) {
        status = newStatus;
    }
    return {
        getStatus: getStatus,
        setStatus: setStatus,
    }
});