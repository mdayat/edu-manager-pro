<script>
  import Sidebar from "../../lib/components/Sidebar.svelte";
  import StudentForm from "../../lib/components/StudentForm.svelte";
  import StudentList from "../../lib/components/StudentList.svelte";
</script>

<h1>This is a student menu</h1>
<Sidebar></Sidebar>
<StudentForm></StudentForm>
<StudentList></StudentList>

<style>
  h1 {
    text-align: center;
    font-family: Arial;
    color: #323f6c;
  }
</style>
