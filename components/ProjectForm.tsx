import React from 'react';
import { Github } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = () => {
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            githubLink: formData.get("github") as string,
            currentlyWorking: formData.get("currentlyWorking")  === "on"
        }

        try {
            const response = await fetch("/api/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({body: data})
            });

            if(!response.ok){
                console.log("error")
            }

            const result = await response.json();
            console.log(result)
        } catch (error) {
            console.log(error)
            
        }

    }



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white text-center">Add New Project</h2>
        
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="github" className="block text-sm font-medium text-gray-300">
            GitHub Link
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              id="github"
              name="github"
              className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="https://github.com/username/repo"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="currentlyWorking"
              className="w-4 h-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-slate-800"
            />
            Currently Working on this project
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm