<template>
	<div id="app">
		<div class="panle">
			<span class="prev">{{prevNum}}</span>
			<span class="operation">{{operation}}</span>
			<span class="curr">{{currNum}}</span>
		</div>
		<div class="keyboad">
			<div class="key highlight" @click="clear">AC</div>
			<div class="key highlight" @click="back"> Back </div>
			 <div class="key highlight">#</div>
			<div class="key highlight" @click="except">/</div>
			<div class="key" @click="getVal" id="7">7</div>
			<div class="key" @click="getVal" id="8">8</div>
			<div class="key" @click="getVal" id="9">9</div>
			<div class="key highlight" @click="ride">*</div>
			<div class="key" @click="getVal" id="4">4</div>
			<div class="key" @click="getVal" id="5">5</div>
			<div class="key" @click="getVal" id="6">6</div>
			<div class="key highlight" @click="reduce">-</div>
			<div class="key" @click="getVal" id="1">1</div>
			<div class="key" @click="getVal" id="2">2</div>
			<div class="key" @click="getVal" id="3">3</div>
			<div class="key highlight" @click="add">+</div>
			<div class="key" @click="getVal" id="0">0</div>
			<div class="key" @click="getVal" id=".">.</div>
			<div class="key highlight" @click="result">=</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				operation: '',
				prevNum: '',
				currNum: '',
				keyboard: [],
				arr: [],
				res: ''
			}
		},
		mounted() {
			// this.keyboard = document.querySelectorAll('div[class=key]');
			// Array.from(this.keyboard, key => key.addEventListener('click', this.getVal))
		},
		methods: {
			getVal(e) {
				this.currNum += e.target.id;
				this.arr.push(e.target.id);
			},
			clear() {
				this.prevNum = this.operation = this.currNum = '';
			},
			back() {
				this.arr.splice(-1, 1)
				this.currNum = this.arr.join('')
			},
			add() {
				this.prevNum = this.currNum;
				this.currNum = '';
				this.operation = '+';
			},
			reduce() {
				this.prevNum = this.currNum;
				this.currNum = '';
				this.operation = '-';
			},
			ride() {
				this.prevNum = this.currNum;
				this.currNum = '';
				this.operation = '*';
			},
			except() {
				this.prevNum = this.currNum;
				this.currNum = '';
				this.operation = '/';
			},
			result() {
				switch (this.operation) {
					case '+':
						this.res = Number(this.currNum) + Number(this.prevNum);
						break;
					case '-':
						this.res = Number(this.prevNum) - Number(this.currNum);
						break;
					case '*':
						this.res = Number(this.prevNum) * Number(this.currNum);
						break;
					case '/':
						this.res = Number(this.prevNum) / Number(this.currNum);
						break;
				}
				this.clear();
				this.currNum = this.res;
				this.arr = [];
			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	body {
		background-color: #000000;
		transform: scale(0.8);
	}

	.panle {
		border: 1px solid #5f5f5f;
		width: 100vw;
		height: 29vh;
		font-size: 3.8125rem;
		color: #FFFFFF;
		text-align: right;
		position: relative;
	}

	.curr {
		display: block;
		position: absolute;
		width: inherit;
		bottom: 0;
		font-size: 2.8rem;
	}

	.operation {
		display: block;
		position: absolute;
		width: inherit;
		bottom: 40px;
		font-size: 2.275rem;
	}

	.prev {
		font-size: 2.275rem;
		display: block;
		position: absolute;
		width: inherit;
		bottom: 5rem;
	}

	.keyboad {
		display: flex;
		flex-flow: row wrap;
		margin: 0 calc((8vw - 16px) / 2);
	}

	.key {
		display: inline-block;
		width: 23vw;
		height: 23vw;
		border-radius: 50%;
		text-align: center;
		font-size: 30px;
		line-height: 23vw;
		margin: 2px;
		background-color: #616161;
		color: #ffffff;
		cursor: pointer;
		outline: none;
		border: none;
		box-shadow: 0 7px #999;
	}

	.key:active {
		box-shadow: 0 5px #666;
		transform: translateY(4px);
		outline: none;
	}

	.key:last-child {
		border-radius: 30%;
		flex-grow: 1;
		margin: 0;
	}

	.highlight {
		background-color: #e77919;
	}
</style>
