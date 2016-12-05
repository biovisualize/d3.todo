var expect = chai.expect;

describe('Todo', function() {

    var container, todo, input, button;

    beforeEach(function() {
        container = document.createElement('div')
        container.id = 'todo'
        document.body.appendChild(container);

        todo = todoWidget({
            container: container
        })

        input = container.querySelector('input.item-input')
        button = container.querySelector('button')
    })

    afterEach(function() {
        document.body.removeChild(container)
    })

    it('should initialize with an input box and an "add" button', function() {

        expect(input).to.exist
        expect(button).to.exist
    })

    it('should append an item when clicking on "add" button', function() {
        input.value = 'do it'
        button.click()

        var item = container.querySelector('.item')
        var label = item.querySelector('.label')

        expect(item).to.exist
        expect(label.innerText).to.equal('do it')
    })

    it('should append an item on "enter" key', function() {
        input.value = 'do it'
        var keyCode = 13
        var event = document.createEvent('Event');
        event.initEvent('keypress', true, true)
        event.keyCode = keyCode;
        event.which = keyCode;
        input.dispatchEvent(event);

        var item = container.querySelector('.item')
        expect(item).to.exist
    })

    it('should toggle the "done" state of the item', function() {
        input.value = 'do it'
        button.click()

        var item = container.querySelector('.item')
        var stateButton = item.querySelector('.state-button')

        stateButton.click()

        expect(item.classList.contains('done')).to.be.ok

        stateButton.click()

        expect(item.classList.contains('done')).not.to.be.ok
    })

    it('should delete the item', function() {
        input.value = 'do it'
        button.click()

        var item = container.querySelector('.item')
        var deleteButton = item.querySelector('.delete-button')
        expect(item).to.exist

        deleteButton.click()

        var deletedItem = container.querySelector('.item')

        expect(deletedItem).not.to.exist
    })

    it('can be populated with items', function() {
        todo.setItems(['To do 1', 'To do 2', 'To do 3'])
        var items = container.querySelectorAll('.item')

        expect(items.length).to.equal(3)
    })
})
