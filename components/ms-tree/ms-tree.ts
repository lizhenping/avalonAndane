import * as avalon from 'avalon2';
import '../ms-checkbox';
import './metroStyle.css';
import * as $ from 'jquery';
import './jquery.ztree.core';
import './jquery.ztree.excheck';

avalon.component('ms-tree', {
    template: require('./ms-tree.html'),
    defaults: {
        checkable: false,
        tree: [],
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        onCheck: avalon.noop,
        onSelect: avalon.noop,
        beforeExpand: avalon.noop,
        handleCheck(e, treeId, node) {
            const treeObj = $.fn.zTree.getZTreeObj(treeId);
            const checkedNodes = treeObj.getNodesByFilter(n => {
                const parentNode = n.getParentNode();
                const checkStatus = n.getCheckStatus() || { checked: false, half: false };
                const parentCheckStatus = parentNode ? (parentNode.getCheckStatus() || { checked: false, half: false }): { checked: false, half: false };
                return (checkStatus.checked && !checkStatus.half) && (!parentCheckStatus.checked || parentCheckStatus.half);
            });
            const checkedKeys = checkedNodes.map(n => n.key);
            
            //this.checkedKeys = checkedKeys
            this.onCheck(checkedKeys, {
                checked: node.checked,
                checkedNodes: checkedNodes,
                node: node,
                event: e
            });
        },
        handleSelect(e, treeId, node, clickFlag) {
            this.selectedKeys = [node.key];
            this.onSelect(this.selectedKeys.toJSON(), {
                selected: clickFlag,
                selectedNodes: [{
                    key: node.key, title: node.title
                }],
                node: node,
                event: e
            });
        },
        onInit(event) {
            var initTree = (el, tree) => {
                return $.fn.zTree.init($(el), {
                    check: { enable: this.checkable },
                    data: {
                        key: {
                            name: 'title'
                        }
                    },
                    callback: {
                        onCheck: (e, treeId, node) => {
                            this.handleCheck(e, treeId, node);
                        },
                        onClick: (e, treeId, node, clickFlag) => {
                            this.handleSelect(e, treeId, node, clickFlag);
                        },
                        beforeExpand: (treeId, treeNode) => {
                            this.beforeExpand(treeId, treeNode);
                            return (treeNode.expand !== false);
                        }
                    },
                    view: {
                        fontCss: (treeId, treeNode) => {
                            return (!!treeNode.highlight) ? {color: "#A60000", "font-weight":"bold"} : {color: "#333", "font-weight":"normal"};
                        }
                    }
                }, tree);
            };
            var treeObj = initTree(event.target, this.tree.toJSON());

            this.$watch('checkedKeys', v => {
                if (this.checkable) {
                    treeObj.checkAllNodes(false);
                    treeObj.getNodesByFilter(n => v.contains(n.key)).forEach(n => {
                        treeObj.checkNode(n, true, true);
                    });
                } else {
                    treeObj.getNodesByFilter(n => v.contains(n.key)).forEach(n => {
                        treeObj.selectNode(n);
                    });
                }
            });
            
            this.$watch('expandedKeys', v => {
                treeObj.expandAll(false);
                treeObj.getNodesByFilter(n => v.contains(n.key)).forEach(n => {
                    treeObj.expandNode(n, true);
                });
            });

            this.$watch('tree', v => {
                treeObj = initTree(event.target, v.toJSON());
            });

            this.$fire('checkedKeys', this.checkedKeys);
            this.$fire('expandedKeys', this.expandedKeys);
        }
    }
});