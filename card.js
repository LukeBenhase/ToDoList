class card {
    constructor(title, description, dueDate, priority, isChecked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isChecked = isChecked;        
    }

    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getDueDate() {
        return this.dueDate;
    }
    getPriority() {
        return this.priority;
    }
    getIsChecked() {
        return this.isChecked;
    }

    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }   
    setPriority(priority) {
        this.priority = priority;
    }
    setIsChecked(isChecked) {
        this.isChecked = isChecked;
    }
}

