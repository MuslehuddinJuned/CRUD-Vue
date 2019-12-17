<template>
    <div class="navbar p-0">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link :to="{name:'Index'}">
                    <span class="nav-title">Ninja Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab green" style="margin: 0 70px;">
                    <router-link :to="{name:'Index'}">
                        <i class="material-icons">home</i>
                    </router-link>
                </a>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{name:'AddSmoothie'}">
                        <i class="material-icons aa">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }
}
</script>

<style>
.navbar nav{
    padding: 0 20px;
}

.navbar .nav-title:hover{
    color: aliceblue !important;
}
.navbar i:hover{
    background: #0056B3;
}
</style>