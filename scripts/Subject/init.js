import {CRUD} from "../CRUD";

// selectors :
const close_icon = document.querySelector(".close-icon")
const blur_layout = document.querySelector(".blur-layer")
const add_subject_container = document.querySelector('.add_subject')
const add_subject_sub_container = document.querySelector('.add_sub_subject')
const update_subject_container = document.querySelector('.update_subject')
const update_subject_sub_container = document.querySelector('.update_sub_subject')
const add_subject_form = document.getElementById('add_subject_form')
const add_subject_sub_form = document.getElementById('add_sub_subject_form')
const title_sub_error = document.getElementById('title_sub_error')
const max_sub_error = document.getElementById('max_sub_error')
const min_sub_error = document.getElementById('min_sub_error')
const add_subject = document.getElementById('add_subject')
const Subjects = document.getElementsByClassName('Subject')
const SubjectContainer = document.getElementById('subjects-container')
const add_subject_form_button = document.querySelector('.add_subject .btn-primary')
const add_sub_subject_form_button = document.querySelector('.add_sub_subject .btn-primary')
const update_subject_form_button = document.querySelector('.update_subject .btn-primary')
const update_sub_subject_form_button = document.querySelector('.update_sub_subject .btn-primary')
const btn_cancel = document.querySelectorAll('.btn_cancel');
let self = null;

export class InitSubject extends CRUD {
    constructor() {
        super('http://localhost:3001/subject')
        self = this;
        this.RenderSubjects().then(() => {
            this.details()
        })
    }

    async RenderSubjects() {
        SubjectContainer.innerHTML = ``;
        let HTMLSubject = `<div class="text-gray-800 Subject">
            <div
                class="SubjectTitle flex gap-4 cursor-pointer hover:bg-gray-50 active:bg-gray-200 transition px-4 py-3 shadow rounded-lg items-center">
                <div class="icon-extend-shrink">
                    <svg
                        class="down hidden fill-current object-cover text-gray-700 h-6 w-6 down transition hover:text-gray-900">
                        <use href="images/SVG/sprite.svg#down"></use>
                    </svg>
                    <svg
                        class="up fill-current object-cover text-gray-700 h-6 w-6 up transition hover:text-gray-900">
                        <use href="images/SVG/sprite.svg#up"></use>
                    </svg>
                </div>
                <span>{TITLE}</span>
                <div 
                    class=" icon-edit-add flex gap-1 ml-auto"
                    data-min="{min}"
                    data-max="{max}"
                    data-title="{title}"
                    data-id="{id}"
                    data-parent="{parent}">
                    <div
                        class="add flex h-8 w-8 justify-center items-center rounded-full transition bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600"
                        >
                        <svg class="fill-current object-cover text-white h-4 w-4">
                            <use href="images/SVG/sprite.svg#add"></use>
                        </svg>
                    </div>
                    <div
                        class="edit flex h-8 w-8 justify-center items-center rounded-full transition bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600">
                        <svg class="fill-current object-cover text-white h-4 w-4">
                            <use href="images/SVG/sprite.svg#edit"></use>
                        </svg>
                    </div>
                    <div
                        class="delete flex h-8 w-8 justify-center items-center rounded-full transition bg-red-500 hover:bg-red-400 active:bg-red-600">
                        <svg class="fill-current object-cover text-white h-4 w-4">
                            <use href="images/SVG/sprite.svg#trash"></use>
                        </svg>
                    </div>
                </div>
            </div>
 {CHILDREN}
        </div>`;
        let HTMLSubjectChildren = `<div class="SubjectChild pl-4 py-6 -mt-2 transition">
                <ul class="flex flex-col gap-y-2">
                    <li
                        class="flex justify-between items-center cursor-pointer hover:bg-gray-50 active:bg-gray-200 transition px-4 py-3 shadow rounded-lg">
                        <span>{TITLE}</span>
                        <div class="flex gap-x-1" 
                            data-title="{title}"
                            data-id="{id}"
                            data-parent="{parent}">
                        <div class="edit-child hover:bg-gray-200 active:bg-gray-300 p-2 h-8 transition w-8 rounded-full cursor-pointer">
                            <svg class="fill-current object-cover text-gray-700 h-4 w-4">
                                <use href="images/SVG/sprite.svg#edit"></use>
                            </svg>
                        </div>
                        <div class="remove-child hover:bg-red-200 active:bg-red-300 p-2 h-8 transition w-8 rounded-full cursor-pointer">
                            <svg class="fill-current object-cover text-red-700 h-4 w-4">
                                <use href="images/SVG/sprite.svg#trash"></use>
                            </svg>
                        </div>
                        </div>

                    </li>
                </ul>
            </div>`;
        let subjectsData = await this.getAll();
        console.log(subjectsData)
        const subjectsHTML = subjectsData.map((element, _, array) => {
            let subject = '';
            if (!element.parent) {
                console.log(`parent: ${element.title}`)
                subject = HTMLSubject.replace('{id}', element.id).replace('{title}', element.title).replace('{max}', element.max).replace('{min}', element.min).replace('{TITLE}', element.title);
                let children = array.map(el => {
                    if (el.parent === element.id) {
                        return HTMLSubjectChildren.replaceAll('{id}', el.id).replace('{title}', el.title).replace('{parent}', el.parent).replace('{TITLE}', el.title);
                    }
                }).join``
                subject = subject.replace('{CHILDREN}', children);
            }
            return subject;
        })
        SubjectContainer.insertAdjacentHTML('beforeend', subjectsHTML.join``);
    }

    details() {
        //// work on details :
        for (let subject of Subjects) {
            let title = subject.querySelector('.SubjectTitle')
            let children_container = subject.querySelector(".SubjectChild")
            let children = subject.getElementsByClassName('li')
            let icon_extend = subject.querySelector(".down");
            let icon_shrink = subject.querySelector(".up")
            let icon_edit = subject.querySelector(".edit")
            let icon_delete = subject.querySelector(".delete")
            let icon_add = subject.querySelector(".add")
            icon_extend.addEventListener('click', function () {
                this.classList.add('hidden')
                icon_shrink.classList.remove('hidden')
                children_container.classList.remove('hidden-list')
                children_container.classList.add('show-list')

            })
            icon_shrink.addEventListener('click', function () {
                this.classList.add('hidden');
                icon_extend.classList.remove('hidden');
                children_container.classList.remove('show-list')
                children_container.classList.add('hidden-list')
            })
            icon_add.addEventListener('click', function () {
                self.showForm(add_subject_sub_container)
            })
            icon_delete.addEventListener('click',function () {
                let id = this.parentElement.dataset.id;
                swal({
                    title: "Are you sure!",
                    text: "This subject will delete permanently and all questions inside it!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then(async (willDelete) => {
                        if (willDelete) {
                            await self.delete(id);
                            self.RenderSubjects().then(() => {
                                self.details()
                            })
                            swal("Poof! The subject has been deleted!", {
                                icon: "success",
                            });
                        }
                    });
            })
            icon_edit.addEventListener("click", function () {
                self.showForm(update_subject_container)
            })
            for (const child of children) {
                let icon_edit = child.querySelector(".edit-child");
                icon_edit.addEventListener('click', function () {
                    self.showForm(update_subject_sub_container)
                })
            }
        }
        this.addSubjects()
    }

    addSubjects() {
        add_subject.addEventListener('click', function () {
            self.showForm(add_subject_container)
        })

        add_subject_sub_form.addEventListener('submit', function (e) {
            e.preventDefault()
            console.log('submit')
            let dataForm = Object.fromEntries(new FormData(e.target))
            console.log(dataForm)
        })
        add_subject_form.addEventListener('submit', async function (e) {
            e.preventDefault()
            let dataForm = Object.fromEntries(new FormData(e.target))
            console.log(dataForm)
            let response = await self.create(JSON.stringify(dataForm))
            if(response){
                swal("Poof! The subject has been created!", {
                    icon: "success",
                }).then(()=>self.resetForms());
            }else{
                swal("ooh! error happens in creating this subject!", {
                    icon: "error",
                });
            }
            await self.RenderSubjects()
            self.details()
        });

        [...btn_cancel].forEach(function (element) {
            element.addEventListener("click", function () {
                self.resetForms()
            })
        })
        close_icon.addEventListener("click", function () {
            self.resetForms()
        })
    }

    showForm(form) {
        blur_layout.classList.remove('hidden')
        form.classList.remove('hidden')
    }

    resetForms() {
        blur_layout.classList.add('hidden')
        add_subject_container.classList.add('hidden')
        add_subject_sub_container.classList.add('hidden')
        update_subject_sub_container.classList.add('hidden')
        update_subject_container.classList.add('hidden')
    }
}
