import React from 'react'
import ProjectCard from '../../../components/ProjectCard/ProjectCard'
import '../../../components/ProjectCard/ProjectCard.css'

import repos from '../../../../mock-backend/repositories.json'
import users from '../../../../mock-backend/users.json'
import files from '../../../../mock-backend/files.json'

function fileTypeToLanguage(type, name){
	// naive mapping from file extension/type to language name used in languageColors
	const ext = (name && name.split('.').pop()) || type || ''
	if(/^(js|jsx|ts|tsx)$/.test(ext)) return 'JavaScript'
	if(/^(css)$/.test(ext)) return 'CSS'
	if(/^(html|htm)$/.test(ext)) return 'HTML'
	if(/^(py)$/.test(ext)) return 'Python'
	if(/^(java)$/.test(ext)) return 'Java'
	return 'Other'
}

function computeLanguagesForRepo(repoId){
	const repoFiles = files.filter(f => f.repo_id === repoId)
	if(repoFiles.length === 0) return []
	const sizeByLang = {}
	repoFiles.forEach(f =>{
		const lang = fileTypeToLanguage(f.type, f.name)
		sizeByLang[lang] = (sizeByLang[lang] || 0) + (f.size_kb || 0)
	})
	const total = Object.values(sizeByLang).reduce((a,b)=>a+b,0)
	return Object.keys(sizeByLang).map(name => ({name, percent: Math.round((sizeByLang[name]/total)*1000)/10}))
}

function mapRepoToProject(repo){
	const owner = users.find(u => u._id === repo.owner_id)
	const collaborators = (repo.members || []).map(m => {
		const u = users.find(uu => uu._id === m.user_id)
		return {name: u?.username || m.user_id, avatar: u?.avatar_url || ''}
	})
	return {
		name: repo.name,
		visibility: 'public',
		stars: Math.floor(Math.random()*500),
		owner: owner?.username || repo.owner_id,
		description: repo.description,
		languages: computeLanguagesForRepo(repo._id),
		collaborators
	}
}

export default function RepositoryCard(){
	const repo = repos[0]
	const project = mapRepoToProject(repo)

	return (
		<div style={{padding:20}}>
			<ProjectCard project={project} />
		</div>
	)
}
