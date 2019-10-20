<template>
  <div class="todo-toggle box">
    <div class="box">
      <div class="box__inner">
        <div class="todo-toggle__wrapper">
          <div class="radio-icon">
            <label class="radio-container">
              <input
                type="checkbox"
                :checked="checked"
                @change="$emit('change', $event.target.checked)"
              />
              <span class="checkmark">
                <i class="icon-check">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"
                    />
                  </svg>
                </i>
              </span>
              <span class="label">{{ labelText }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoListToggle',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: ['showAll', 'checked'],
  computed: {
    labelText: function () {
      return this.showAll ? 'Show active' : 'Show All'
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-toggle {
  margin: 0 16px 16px;
  &__wrapper {
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;
  }
}

.checkbox {
  input {
    display: none;
  }
  > div {
    display: flex;
    align-items: center;
  }
  &__mark {
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid #ffaa00;
    border-radius: 2px;
    margin-right: 6px;
  }

  input:checked + div .checkbox__mark {
    background-color: #ffaa00;
    box-shadow: inset 0 0 0 3px white;
  }
}
</style>
