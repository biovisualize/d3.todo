(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        factory(module.exports, require('d3'))
    } else {
        factory(root, root.d3)
    }
}(this, function(exports, d3) {

    var todoWidget = function(config) {
        var items = [],
            uid = 0,
            list

        var init = function() {
            var container = d3.select(config.container)
                .append('div')
                .attr('class', 'todo-container')

            var itemBox = container.append('input')
                .attr('class', 'item-input')
                .on('keypress', function() {
                    if (d3.event.which === 13) {
                        addItem(this.value)
                    }
                })

            container.append('button')
                .text('Add')
                .attr('class', 'add-button')
                .on('click', function() {
                    addItem(itemBox.property('value'))
                })

            list = container.append('ul')
                .attr('class', 'item-list')

            return this
        }

        init()

        var setItems = function(_items) {
            items = _items.map(function(d) {
                return {
                    label: d,
                    isDone: false,
                    uid: uid++
                }
            })
            renderList()

            return this
        }

        var addItem = function(itemText) {
            items.push({
                label: itemText,
                isDone: false,
                uid: uid++
            })
            renderList()

            return this
        }

        var removeItem = function(item) {
            var itemIndex = items.map(function(d) {
                    return d.uid
                })
                .indexOf(item.uid)
            if (itemIndex > -1) {
                items.splice(itemIndex, 1)
                renderList()
            }

            return this
        }

        var setItemState = function(item) {
            item.isDone = !item.isDone
            renderList()

            return this
        }

        var renderList = function() {
            var item = list.selectAll('li')
                .data(items, function(d) {
                    return d.uid
                })
            var itemEnter = item.enter().append('li')
                .attr('class', 'item')
            itemEnter.append('input')
                .attr('type', 'checkbox')
                .attr('class', 'state-button')
                .on('click', setItemState)
            itemEnter.append('span')
                .attr('class', 'label')
                .text(function(d) {
                    return d.label
                })
            itemEnter.append('span')
                .attr('class', 'delete-button')
                .html('&#10060;')
                .on('click', removeItem)
            itemEnter.merge(item)
                .classed('done', function(d) {
                    return d.isDone
                })
            item.exit().remove()

            return this
        }

        return {
            setItems: setItems
        }
    }

    exports.todoWidget = todoWidget

}))
