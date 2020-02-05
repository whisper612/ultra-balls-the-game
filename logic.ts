public checkForClusters()
{
    var v_clusters: any[] = new Array();
    var h_clusters: any[] = new Array();
    var v_temp: any[];
    var h_temp: any[];

    var clusters: any[] = new Array();

    for (var i = 0; i < this._Tiles.length; i++) {
        for (var j = 1; j < this._Tiles[i].length; j++) {
            if (this._Tiles[i][j]._type == this._Tiles[i][j - 1]._type) {
                if (h_temp == null) {
                    h_temp = new Array();
                    h_temp.push(this._Tiles[i][j]);
                    h_temp.push(this._Tiles[i][j - 1]);
                }
                else {
                    h_temp.push(this._Tiles[i][j]);
                }
            }
            else {
                if (h_temp != null) {
                    if (h_temp.length > 2) {
                        h_clusters.push(h_temp);
                    }

                    h_temp = null;
                }
            }
        }
        if (h_temp != null) {
            if (h_temp.length > 2) {
                h_clusters.push(h_temp);
            }

            h_temp = null;
        }
    }

    for (var j = 0; j < this._Tiles.length; j++) {
        for (var i = 1; i < this._Tiles[j].length; i++) {
            if (this._Tiles[i][j]._type == this._Tiles[i - 1][j]._type) {
                if (v_temp == null) {
                    v_temp = new Array();
                    v_temp.push(this._Tiles[i][j]);
                    v_temp.push(this._Tiles[i - 1][j]);
                }
                else {
                    v_temp.push(this._Tiles[i][j]);
                }
            }
            else {
                if (v_temp != null) {
                    if (v_temp.length > 2) {
                        v_clusters.push(v_temp);
                    }

                    v_temp = null;
                }
            }
        }
        if (v_temp != null) {
            if (v_temp.length > 2) {
                v_clusters.push(v_temp);
            }

            v_temp = null;
        }

    }

    if (v_clusters.length > 0) {
        for (var i = 0; i < v_clusters.length; i++) {
            for (var j = 0; j < v_clusters[i].length; j++) {
                v_clusters[i][j].UI_slot.texture = Game.RESOURCES.slot_b.texture;
                clusters.push(v_clusters[i]);
            }
        }
    }

    if (h_clusters.length > 0) {
        for (var i = 0; i < h_clusters.length; i++) {
            for (var j = 0; j < h_clusters[i].length; j++) {
                h_clusters[i][j].UI_slot.texture = Game.RESOURCES.slot_d.texture;
                clusters.push(h_clusters[i]);
            }
        }
    }

    return clusters;
}  